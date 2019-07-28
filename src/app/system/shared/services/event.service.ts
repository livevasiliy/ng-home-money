import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseApi } from '../../../shared/core/base-api';
import { VPEventModel } from '../models/event.model';
import { Observable } from 'rxjs';

@Injectable()
export class EventService extends BaseApi {
  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  addEvent(event: VPEventModel): Observable<VPEventModel> {
    return this.post('events', event);
  }
}
