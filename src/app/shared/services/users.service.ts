import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { BaseApi } from '../core/base-api';


@Injectable()
export class UsersService extends BaseApi {
  constructor(protected http: HttpClient) {
    super(http);
  }

  getUserByEmail(email: string) {
    return this.get(`users?email=${email}`).pipe(
      map((user: User[]) => user[0] ? user[0] : undefined));
  }

  createNewUser(user: User) {
    return this.post(`users`, user);
  }
}
