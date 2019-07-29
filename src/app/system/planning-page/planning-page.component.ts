import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';

import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventService } from '../shared/services/event.service';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { VPEventModel } from '../shared/models/event.model';

@Component({
  selector: 'vp-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoading = false;
  sub1: Subscription;
  bill: Bill;
  categories: Category[];
  events: VPEventModel[];

  constructor(private billService: BillService,
              private categoryService: CategoriesService,
              private  eventService: EventService) {
  }

  ngOnInit(): void {
    this.sub1 = combineLatest(
      this.billService.getBill(),
      this.categoryService.getCategories(),
      this.eventService.getEvents())
      .subscribe((data: [Bill, Category[], VPEventModel[]]) => {
        this.bill = data[0];
        this.categories = data[1];
        this.events = data[2];
        this.isLoading = true;
      });
  }

  getCategoryCost(category: Category): number {
    const categoryEvents = this.events
      .filter(e => e.category === category.id && e.type === 'outcome');

    return categoryEvents.reduce((total, event) => {
      total += event.amount;
      return total;
    }, 0);
  }

  private getPercent(category: Category): number {
    const percent = (100 * this.getCategoryCost(category)) / category.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCategoryPercent(category: Category): string {
    return this.getPercent(category) + '%';
  }

  getCategoryColorClass(category: Category): string {
    const percent = this.getPercent(category);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
