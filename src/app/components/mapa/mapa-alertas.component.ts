import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mapa-alertas',
  templateUrl: './mapa-alertas.component.html',
  styleUrls: ['./mapa-alertas.component.css'],
})
export class MapaAlertasComponent implements OnInit {
  mapa: any;
  marker: any;
  latitud!: number;
  longitud!: number;
  ubicacionDetectada: boolean = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.inicializarMapa();
    this.obtenerUbicacionActual();
  }

  inicializarMapa(): void {
    this.mapa = L.map('mapa').setView([-8.111, -79.03], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.mapa);

    this.mapa.on('click', (e: any) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      this.latitud = lat;
      this.longitud = lng;

      localStorage.setItem('latitud', lat.toString());
      localStorage.setItem('longitud', lng.toString());

      this.ubicacionDetectada = true;

      if (this.marker) {
        this.mapa.removeLayer(this.marker);
      }

      this.marker = L.marker([lat, lng])
        .addTo(this.mapa)
    });
  }

  obtenerUbicacionActual(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitud = position.coords.latitude;
          this.longitud = position.coords.longitude;
          this.ubicacionDetectada = true;

          localStorage.setItem('latitud', this.latitud.toString());
          localStorage.setItem('longitud', this.longitud.toString());

          this.mapa.setView([this.latitud, this.longitud], 14);

          if (this.marker) {
            this.mapa.removeLayer(this.marker);
          }
          this.marker = L.marker([this.latitud, this.longitud])
            .addTo(this.mapa)
            .bindPopup('Estás aquí')
            .openPopup();
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
        }
      );
    } else {
      console.warn('Geolocalización no es soportada por este navegador.');
    }
  }

  registrarUbicacion(): void {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const body = {
      name: 'Ubicación actual',
      latitude: this.latitud,
      longitude: this.longitud,
      alertThreshold: 'MODERATE',
    };

    this.http
      .post('http://localhost:8080/api/alerts', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe({
        next: () => {
          alert('¡Ubicación registrada exitosamente para recibir alertas!');
        },
        error: () => {
          alert('Hubo un error al registrar tu ubicación.');
        },
      });
  }
}
