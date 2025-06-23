import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa-alertas',
  imports: [],
  templateUrl: './mapa-alertas.component.html',
  styleUrl: './mapa-alertas.component.css'
})
export class MapaAlertasComponent implements AfterViewInit {

  mapInstance!: L.Map;

  provincias = [
    { nombre: 'Guadalupe', lat: -7.248162, lon: -79.477376, nivel: 'Fuerte' },
    { nombre: 'Pacasmayo', lat: -7.401445, lon: -79.571445, nivel: 'Moderada' },
    { nombre: 'Virú', lat: -8.417136, lon: -78.748108, nivel: 'Sin alerta' },
    { nombre: 'Otuzco', lat: -7.902948, lon: -78.588264, nivel: 'Suave' },
    { nombre: 'Pataz', lat: -8.100222, lon: -77.328365, nivel: 'Moderada' }
  ];

  ngAfterViewInit(): void {
    if (this.mapInstance) {
      this.mapInstance.remove(); // Elimina mapa anterior si existe
    }

    this.mapInstance = L.map('mapa').setView([-8.1, -78.9], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.mapInstance);

    this.provincias.forEach(p => {
      const color = this.getColor(p.nivel);
      const marker = L.circleMarker([p.lat, p.lon], {
        radius: 10,
        color: color,
        fillColor: color,
        fillOpacity: 0.8
      }).addTo(this.mapInstance);

      marker.bindPopup(`<strong>${p.nombre}</strong><br>Nivel: ${p.nivel}`);
    });
  }

  getColor(nivel: string): string {
    switch (nivel) {
      case 'Fuerte': return 'red';
      case 'Moderada': return 'orange';
      case 'Suave': return 'blue';
      default: return 'green';
    }
  }
}

