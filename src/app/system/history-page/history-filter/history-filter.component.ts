import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'vp-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent {

  @Output() FilterCancel = new EventEmitter<any>();
  @Output() FilterApply = new EventEmitter<any>();

  @Input() categories: Category[] = [];

  timePeriods = [
    {type: 'd', label: 'День'},
    {type: 'w', label: 'Неделя'},
    {type: 'M', label: 'Месяц'}
  ];
  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  constructor() {
  }


  closeFilter() {
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.selectedPeriod = 'd';
    this.FilterCancel.emit();
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      if (this[field].indexOf(value) === -1) {
        this[field].push(value);
      }
    } else {
      this[field] = this[field].filter(i => i !== value);
    }
  }

  changeTypeHandle(event) {
    const {checked, value} = event.currentTarget;
    this.calculateInputParams('selectedTypes', checked, value);
    console.log(checked, value);
  }

  changeCategoryHandle(event) {
    const {checked, value} = event.currentTarget;
    this.calculateInputParams('selectedCategories', checked, value);
    console.log(checked, value);
  }

  applyFilter() {
    this.FilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }
}
