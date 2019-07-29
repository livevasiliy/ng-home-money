import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import * as moment from 'moment';

import { CategoriesService } from '../shared/services/categories.service';
import { EventService } from '../shared/services/event.service';

import { Category } from '../shared/models/category.model';
import { VPEventModel } from '../shared/models/event.model';

@Component({
  selector: 'vp-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  sub: Subscription;
  isLoading = false;
  categories: Category[] = [];
  events: VPEventModel[] = [];
  filteredEvents: VPEventModel[] = [];
  chartData = [];
  isFilterVisible = false;

  constructor(
    private categoriesService: CategoriesService,
    private eventService: EventService
  ) {
  }

  ngOnInit(): void {
    this.sub = combineLatest(
      this.categoriesService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [Category[], VPEventModel[]]) => {
      this.categories = data[0];
      this.events = data[1];
      this.calculateChartData();
      this.setOriginalEvents();
      this.isLoading = true;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private setOriginalEvents(): void {
    this.filteredEvents = this.events.slice();
  }

  private calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((category) => {
      const categoryEvent = this.filteredEvents
        .filter((event) => event.category === category.id && event.type === 'outcome');
      this.chartData.push({
        name: category.name,
        value: categoryEvent.reduce((total, event) => {
          total += event.amount;
          return total;
        }, 0)
      });
    });
  }

  private toggleFilteVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  openFilter() {
    this.toggleFilteVisibility(true);
  }

  filterApply(filterData) {
    this.toggleFilteVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter((e) => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e) => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });
    this.calculateChartData();
  }

  filterCancel() {
    this.toggleFilteVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }
}
