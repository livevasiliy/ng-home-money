import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Bill } from '../models/bill.model';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable({
  providedIn: 'root'
})
export class BillService extends BaseApi {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  getBill(): Observable<Bill> {
    return this.get('bill');
  }

  getCurrency(): Observable<any> {
    return this.httpClient.get(`http://data.fixer.io/api/latest?access_key=963cd9d7e998c0094b9def747dd2cd85&symbols=EUR,USD,RUB`);
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.put('bill', bill);
  }
}
