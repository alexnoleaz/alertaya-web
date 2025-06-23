import { NgFor, NgIf } from '@angular/common';
import { ClimaService } from './../../services/clima.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recomendaciones',
  standalone: true,
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css'],
  imports: [NgFor, NgIf]
})
export class RecomendacionesComponent{
provincias = [
    { nombre: 'Guadalupe', lat: -7.248162, lon: -79.477376 },
    { nombre: 'Pacasmayo', lat: -7.401445, lon: -79.571445 },
    { nombre: 'Virú', lat: -8.417136, lon: -78.748108 },
    { nombre: 'Otuzco', lat: -7.902948, lon: -78.588264 },
    { nombre: 'Pataz', lat: -8.100222, lon: -77.328365 }
  ];

  provinciaSeleccionada: any = null;
  nivel: string = '';
  lluvia: number = 0;

  constructor(private climaService: ClimaService) {}

  seleccionarProvincia(nombre: string): void {
    const provincia = this.provincias.find(p => p.nombre === nombre);
    if (!provincia) return;

    this.climaService.obtenerClimaPorCoord(provincia.lat, provincia.lon).subscribe(data => {
      this.provinciaSeleccionada = provincia;
      this.lluvia = data.rain?.['1h'] ?? 0;
      this.nivel = this.getNivel(this.lluvia);
    });
  }

 getNivel(valor: number): string {
  if (!valor || valor === 0) return 'Sin alerta';
  if (valor <= 2.5) return 'Suave';
  if (valor <= 7.6) return 'Moderada';
  return 'Fuerte';
}
}
