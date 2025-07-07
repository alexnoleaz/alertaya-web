import { NgClass, NgFor, NgIf } from '@angular/common';
import { ClimaService } from './../../services/clima.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recomendaciones',
  standalone: true,
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css'],
  imports: [NgFor, NgIf, NgClass]
})
export class RecomendacionesComponent {

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

  recomendaciones: string[] = []; // Almacena las recomendaciones a mostrar

  constructor(private climaService: ClimaService) {}

  // Se ejecuta cuando se elige una provincia
  seleccionarProvincia(nombre: string): void {
    const provincia = this.provincias.find(p => p.nombre === nombre);
    if (!provincia) return;

    this.climaService.obtenerClimaPorCoord(provincia.lat, provincia.lon).subscribe(data => {
      this.provinciaSeleccionada = provincia;
      this.lluvia = data.rain?.['1h'] ?? 0;
      this.nivel = this.getNivel(this.lluvia);
      this.recomendaciones = this.getRecomendacionesPorNivel(this.nivel);
    });
  }

  // Evalúa la intensidad de lluvia y devuelve el nivel
  getNivel(valor: number): string {
    if (!valor || valor === 0) return 'Sin alerta';
    if (valor <= 2.5) return 'Suave';
    if (valor <= 7.6) return 'Moderada';
    return 'Fuerte';
  }

  // Asigna color según el nivel
  getBadgeColor(nivel: string): string {
    switch (nivel) {
      case 'Fuerte': return 'danger';
      case 'Moderada': return 'warning';
      case 'Suave': return 'info';
      default: return 'success';
    }
  }

  // Devuelve recomendaciones según el nivel
  getRecomendacionesPorNivel(nivel: string): string[] {
    switch (nivel) {
      case 'Fuerte':
        return [
          'Evita sembrar durante las próximas horas.',
          'Protege tus herramientas y maquinaria.',
          'Verifica el estado de los drenajes en los campos.'
        ];
      case 'Moderada':
        return [
          'Planifica con anticipación tareas sensibles.',
          'Supervisa cultivos vulnerables a la humedad.'
        ];
      case 'Suave':
        return [
          'Realiza tareas agrícolas con precaución.',
          'Monitorea los cambios en el clima.'
        ];
      default:
        return [
          'No se reportan lluvias intensas actualmente.',
          'Aprovecha el clima estable para labores de campo.'
        ];
    }
  }
}
