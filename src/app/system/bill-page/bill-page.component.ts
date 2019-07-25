import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { BillService } from '../shared/services/bill.service';
import { Bill } from '../shared/models/bill.model';

@Component({
  selector: 'vp-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.subscription = combineLatest(
      this.billService.getCurrency(),
      this.billService.getBill())
      .subscribe((data: [any, Bill]) => {
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
