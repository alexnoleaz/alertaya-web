import { ClimaService } from './../../services/clima.service';
import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-alertas-distrito',
  imports: [NgFor],
  templateUrl: './alertas-distrito.component.html',
  styleUrl: './alertas-distrito.component.css'
})
export class AlertasDistritoComponent {
provincias: any[] = [];

  datosProvincias = [
  { nombre: 'Guadalupe', lat: -7.248162, lon: -79.477376 },
  { nombre: 'Pacasmayo', lat: -7.401445, lon: -79.571445 },
  { nombre: 'Virú', lat: -8.417136, lon: -78.748108 },
  { nombre: 'Otuzco', lat: -7.902948, lon: -78.588264 },
  { nombre: 'Pataz', lat: -8.100222, lon: -77.328365 }
];


  constructor(private ClimaService : ClimaService) {}

  ngOnInit(): void {
    this.datosProvincias.forEach((prov) => {
      this.ClimaService.obtenerClimaPorCoord(prov.lat, prov.lon).subscribe((data) => {
        const lluvia = data.rain?.['1h'] ?? 0;
        const nivel = this.getNivel(lluvia);
        this.provincias.push({
          nombre: prov.nombre,
          lluvia,
          nivel
        });
      });
    });
  }

  getNivel(valor: number): string {
    if (!valor || valor === 0) return 'Sin alerta';
    if (valor < 2) return 'Suave';
    if (valor < 10) return 'Moderada';
    return 'Fuerte';
  }

  getBadgeColor(nivel: string): string {
    switch (nivel) {
      case 'Fuerte': return 'danger';
      case 'Moderada': return 'warning';
      case 'Suave': return 'info';
      default: return 'success';
    }
  }
}
