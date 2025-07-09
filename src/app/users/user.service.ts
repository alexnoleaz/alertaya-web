import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type Observable } from 'rxjs';

import { type Response } from '../shared/response.interface';
import { type User } from './interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getUserById(id: number): Observable<Response<User>> {
    return this.httpClient.get<Response<User>>(`users/${id}`);
  }
}
