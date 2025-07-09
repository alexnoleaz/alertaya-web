import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type Observable } from 'rxjs';

import { type Response } from '../shared/response.interface';
import { type CreateUserRequest } from '../users/interfaces/ceate-user-request.interface';
import { type AuthResponse } from './interfaces/auth-response.interface';
import { type LoginRequest } from './interfaces/login-request.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  login(data: LoginRequest): Observable<Response<AuthResponse>> {
    return this.httpClient.post<Response<AuthResponse>>('auth/login', data);
  }

  register(data: CreateUserRequest): Observable<Response<AuthResponse>> {
    return this.httpClient.post<Response<AuthResponse>>('auth/register', data);
  }
}
