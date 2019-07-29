import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { EventService } from '../../shared/services/event.service';
import { CategoriesService } from '../../shared/services/categories.service';

import { VPEventModel } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'vp-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: VPEventModel;
  category: Category;
  isLoading = false;
  s1: Subscription;

  constructor(
    private route: ActivatedRoute,
    private eventsServices: EventService,
    private categoriesServices: CategoriesService
  ) { }

  ngOnInit() {
    this.s1 = this.route.params
      .pipe(
        mergeMap((params: Params) => this.eventsServices.getEventById(params.id)),
        mergeMap((event: VPEventModel) => {
          this.event = event;
          return this.categoriesServices.getCategoryById(event.category);
        })
      )
      .subscribe((category: Category) => {
        this.category = category;
        this.isLoading = true;
      });
  }

  ngOnDestroy(): void {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }
}
