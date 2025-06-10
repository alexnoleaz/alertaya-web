import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  private apiKey = 'a4ee941c8c441d3d249c326f1510892b';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  obtenerClimaActual(): Observable<any> {
    const url = `${this.baseUrl}?q=Trujillo,PE&units=metric&appid=${this.apiKey}&lang=es`;
    console.log('URL usada:', url); // Para confirmar visualmente
    return this.http.get(url);
  }
  obtenerPronostico(): Observable<any> {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=Trujillo,PE&units=metric&appid=${this.apiKey}&lang=es`;
  return this.http.get(url);
}
  obtenerClimaPorCoord(lat: number, lon: number): Observable<any> {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}&lang=es`;
  return this.http.get(url);
}


}

