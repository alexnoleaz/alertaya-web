import { NgClass, NgFor, NgIf } from '@angular/common';
import { ClimaService } from './../../services/clima.service';
import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';


@Component({
  selector: 'app-recomendaciones',
  standalone: true,
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css'],
  imports: [NgFor, NgIf, NgClass],
  animations: [trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class RecomendacionesComponent {
  provincias = [
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

  provinciaSeleccionada: any = null;
  nivel: string = '';
  lluvia: number = 0;

  recomendaciones: string[] = [];

  constructor(private climaService: ClimaService) {}

  seleccionarProvincia(nombre: string): void {
    const provincia = this.provincias.find((p) => p.nombre === nombre);
    if (!provincia) return;

    this.climaService
      .obtenerClimaPorCoord(provincia.lat, provincia.lon)
      .subscribe((data) => {
        this.provinciaSeleccionada = provincia;
        this.lluvia = data.rain?.['1h'] ?? 0;
        this.nivel = this.getNivel(this.lluvia);
        this.recomendaciones = this.getRecomendacionesPorNivel(this.nivel);
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

  getRecomendacionesPorNivel(nivel: string): string[] {
    switch (nivel) {
      case 'Fuerte':
        return [
          'Evita sembrar durante las próximas horas.',
          'Protege tus herramientas y maquinaria.',
          'Verifica el estado de los drenajes en los campos.',
        ];
      case 'Moderada':
        return [
          'Planifica con anticipación tareas sensibles.',
          'Supervisa cultivos vulnerables a la humedad.',
        ];
      case 'Suave':
        return [
          'Realiza tareas agrícolas con precaución.',
          'Monitorea los cambios en el clima.',
        ];
      default:
        return [
          'No se reportan lluvias intensas actualmente.',
          'Aprovecha el clima estable para labores de campo.',
        ];
    }
  }
}
