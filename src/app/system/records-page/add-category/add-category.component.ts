import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'vp-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {

  subAddCategory: Subscription;

  @Output() categoryAdd = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) {
  }

  addCategoryFormHandler(addCategory: NgForm) {
    if (addCategory.value.capacity < 0) {
      addCategory.value.capacity *= -1;
    }
    const {name, capacity} = addCategory.value;

    const category = new Category(name, capacity);

    this.subAddCategory = this.categoriesService.addCategory(category)
      .subscribe((categoryResponse: Category) => {
        addCategory.reset();
        addCategory.form.patchValue({capacity: 1});
        this.categoryAdd.emit(categoryResponse);
      });
  }

  ngOnDestroy() {
    if (this.subAddCategory) {
      this.subAddCategory.unsubscribe();
    }
  }

}
