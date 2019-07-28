import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as moment from 'moment';

import { Category } from '../../shared/models/category.model';
import { VPEventModel } from '../../shared/models/event.model';
import { EventService } from '../../shared/services/event.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { mergeMap } from 'rxjs/operators';
import { Message } from '../../../shared/models/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'vp-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {
  subGetBill: Subscription;
  subUpdateBill: Subscription;
  @Input() categories: Category[] = [];

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'},
  ];

  message: Message;

  constructor(
    private eventsService: EventService,
    private billService: BillService
  ) {
  }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  private showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 5000);
  }

  eventFormHandler(eventForm: NgForm) {
    if (eventForm.value.amount < 0) {
      eventForm.value.amount *= -1;
    }
    const {amount, description, category, type} = eventForm.value;

    const event = new VPEventModel(
      type,
      amount,
      +category,
      moment().format('DD.MM.YYYY HH:mm:ss'),
      description
    );
    this.subGetBill = this.billService.getBill().subscribe((bill: Bill) => {
      let value = 0;
      if (type === 'outcome') {
        if (amount > bill.value) {
          this.showMessage(`На счёту недостаточно средств. Вам нехватает ${amount - bill.value}`);
          return;
        } else {
          value = bill.value - amount;
        }
      } else {
        value = bill.value + amount;
      }
      this.subUpdateBill = this.billService.updateBill({value, currency: bill.currency})
        .pipe(mergeMap(() => this.eventsService.addEvent(event)))
        .subscribe(() => {
          eventForm.setValue({
            amount: 0,
            description: ' ',
            category: 1,
            type: 'outcome'
          });
        });
    });
  }

  ngOnDestroy(): void {
    if (this.subGetBill) {
      this.subGetBill.unsubscribe();
    }
    if (this.subUpdateBill) {
      this.subUpdateBill.unsubscribe();
    }
  }
}
