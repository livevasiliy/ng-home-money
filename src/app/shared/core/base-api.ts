import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flatMap, map, mergeMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class BaseApi {
  private baseUrl = 'http://localhost:3000';

  constructor(protected httpClient: HttpClient) {}

  private getUrl(url: string = ''): string {
    return `${this.baseUrl}/${url}`;
  }

  public get(url: string = ''): Observable<any> {
    return this.httpClient.get(this.getUrl(url), {responseType: 'json'});
  }

  public post(url: string = '', data: any = {}): Observable<any> {
    return this.httpClient.post(this.getUrl(url), data, {responseType: 'json'});
  }

  public put(url: string = '', data: any = {}): Observable<any> {
    return this.httpClient.put(this.getUrl(url), data, {responseType: 'json'});
  }
}
