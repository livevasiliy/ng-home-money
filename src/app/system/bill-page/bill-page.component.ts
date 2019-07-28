import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { BillService } from '../shared/services/bill.service';
import { Bill } from '../shared/models/bill.model';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'vp-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;

  currency: any;
  bill: Bill;

  isLoaded = false;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.billService.getCurrency(),
      this.billService.getBill())
      .subscribe((data: [any, Bill]) => {
        this.currency = data[0];
        this.bill = data[1];
        this.isLoaded = true;
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  refreshHandler() {
    this.isLoaded = false;
    this.sub2 = this.billService.getCurrency()
      .pipe(delay(2000))
      .subscribe((currency: any) => {
      this.currency = currency;
      this.isLoaded = true;
    });
  }
}
