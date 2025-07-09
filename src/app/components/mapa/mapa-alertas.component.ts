import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mapa-alertas',
  templateUrl: './mapa-alertas.component.html',
  styleUrls: ['./mapa-alertas.component.css'],
  imports: [FormsModule],
})
export class MapaAlertasComponent implements OnInit {
  mapa: any;
  marker: any;
  latitud!: number;
  longitud!: number;
  ubicacionDetectada: boolean = false;
  nombreUbicacion: string = '';
  nivelAlerta: string = 'MODERATE';

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

      this.marker = L.marker([lat, lng]).addTo(this.mapa);
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
  nivelAlertaSlider: number = 1;

  getNombreAlerta(valor: number): string {
    switch (valor) {
      case 0:
        return 'Suave ';
      case 1:
        return 'Moderada ';
      case 2:
        return 'Alta ';
      default:
        return '';
    }
  }

  getDescripcionAlerta(valor: number): string {
    switch (valor) {
      case 0:
        return 'Lluvias ligeras. Cantidad de lluvia menor a 2.5mm/h';
      case 1:
        return 'Posible afectación. Cantidad de lluvia menor de 7.5mm/h';
      case 2:
        return 'Lluvias intensas, riesgo elevado. Cantidad de lluvia mayor a 7.5mm/h';
      default:
        return '';
    }
  }

  registrarUbicacion(): void {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const body = {
      name: this.nombreUbicacion,
      latitude: this.latitud,
      longitude: this.longitud,
      alertThreshold: this.nivelAlerta,
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
