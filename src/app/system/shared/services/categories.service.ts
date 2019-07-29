import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseApi } from '../../../shared/core/base-api';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable()
export class CategoriesService extends BaseApi {
  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  addCategory(category: Category): Observable<Category> {
    return this.post('categories', category);
  }

  getCategories(): Observable<Category[]> {
    return this.get('categories');
  }

  getCategoryById(id: number): Observable<Category> {
    return this.get(`categories/${id}`);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.put(`categories/${category.id}`, category);
  }
}
