import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../shared/response.interface';

@Injectable({
  providedIn: 'root',
})
export class ClimaService {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  obtenerClimaActual(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(
      'weather/current?lat=-8.111944&lon=-79.028611'
    );
  }
  obtenerPronostico(): Observable<any> {
    return this.httpClient.get<Response<any>>(
      'weather/forecast?lat=-8.111944&lon=-79.028611'
    );
  }
  obtenerClimaPorCoord(lat: number, lon: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(
      `weather/current?lat=${lat}&lon=${lon}`
    );
  }
}
