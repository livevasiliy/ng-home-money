import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { Message } from '../../../shared/models/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'vp-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  subUpdateCategory: Subscription;
  @Input() categories: Category[] = [];
  @Output() categoryEdit: EventEmitter<Category> = new EventEmitter();

  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  constructor(private categoryService: CategoriesService) {
  }

  ngOnInit() {
    this.message = new Message('success', '');
    this.categoryChangeHandler();
  }

  editCategoryFormHandler(editCategory: NgForm) {
    if (editCategory.value.capacity < 0) {
      editCategory.value.capacity *= -1;
    }
    const {capacity, name} = editCategory.value;

    const category = new Category(name, capacity, +this.currentCategoryId);

    this.subUpdateCategory = this.categoryService.updateCategory(category)
      .subscribe((categoryRequest) => {
        this.categoryEdit.emit(categoryRequest);
        this.message.text = 'Категория успешно отредактирована.';
        window.setTimeout(() => this.message.text = '', 5000);
      });
  }

  categoryChangeHandler() {
    this.currentCategory = this.categories
      .find(category => category.id === +this.currentCategoryId);
  }

  ngOnDestroy(): void {
    if (this.subUpdateCategory) {
      this.subUpdateCategory.unsubscribe();
    }
  }
}
