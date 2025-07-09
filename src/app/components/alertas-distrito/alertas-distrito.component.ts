import { ClimaService } from './../../services/clima.service';
import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-alertas-distrito',
  imports: [NgFor],
  templateUrl: './alertas-distrito.component.html',
  styleUrl: './alertas-distrito.component.css',
})
export class AlertasDistritoComponent {
  provincias: any[] = [];

  datosProvincias = [
  { nombre: 'Trujillo', lat: -8.111944, lon: -79.028611 },
  { nombre: 'Ascope', lat: -7.710972, lon: -79.123079 },
  { nombre: 'Bolívar', lat: -7.365556, lon: -77.631944 },
  { nombre: 'Chepén', lat: -7.223056, lon: -79.430833 },
  { nombre: 'Gran Chimú', lat: -7.941389, lon: -78.626389 },
  { nombre: 'Julcán', lat: -7.616944, lon: -78.483611 },
  { nombre: 'Otuzco', lat: -7.902948, lon: -78.588264 },
  { nombre: 'Pacasmayo', lat: -7.401445, lon: -79.571445 },
  { nombre: 'Pataz', lat: -8.100222, lon: -77.328365 },
  { nombre: 'Sánchez Carrión', lat: -7.813611, lon: -78.045278 },
  { nombre: 'Santiago de Chuco', lat: -8.1457756, lon: -78.1730961},
  { nombre: 'Virú', lat: -8.417136, lon: -78.748108 },
];


  constructor(private ClimaService: ClimaService) {}

  ngOnInit(): void {
    this.datosProvincias.forEach((prov) => {
      this.ClimaService.obtenerClimaPorCoord(prov.lat, prov.lon).subscribe(
        (data) => {
          const lluvia = data.rain?.['1h'] ?? 0;
          const nivel = this.getNivel(lluvia);
          this.provincias.push({
            nombre: prov.nombre,
            lluvia,
            nivel,
          });
        }
      );
    });
  }
  getNivel(valor: number): string {
    if (!valor || valor === 0) return 'Sin alerta';
    if (valor <= 2.5) return 'Suave';
    if (valor <= 7.6) return 'Moderada';
    return 'Fuerte';
  }

  getBadgeColor(nivel: string): string {
    switch (nivel) {
      case 'Fuerte':
        return 'danger';
      case 'Moderada':
        return 'warning';
      case 'Suave':
        return 'info';
      default:
        return 'success';
    }
  }
}
