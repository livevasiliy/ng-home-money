import { Component, Input, OnInit } from '@angular/core';

import { Category } from '../../shared/models/category.model';
import { VPEventModel } from '../../shared/models/event.model';

@Component({
  selector: 'vp-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: VPEventModel[] = [];
  searchValue = '';
  searchPlaceholder = 'Сумма';
  searchType = 'amount';

  constructor() {
  }

  ngOnInit() {
    this.events.forEach((e) => {
      e.categoryName = this.categories.find(c => c.id === e.category).name;
    });
  }

  getEventClassName(e: VPEventModel) {
    return {
      label: true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    };
  }

  changeCriteria(type: string) {
    const namesMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    };

    this.searchPlaceholder = namesMap[type];
    this.searchType = type;
  }
}
