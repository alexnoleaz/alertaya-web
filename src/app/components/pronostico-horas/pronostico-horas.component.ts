import { ClimaService } from './../../services/clima.service';
import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
  trigger,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-pronostico-horas',
  imports: [NgFor],
  templateUrl: './pronostico-horas.component.html',
  styleUrl: './pronostico-horas.component.css',
  standalone: true,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class PronosticoHorasComponent {
  pronostico: any[] = [];
  pronosticoAgrupado: any[][] = [];

  constructor(private climaService: ClimaService) {}

  ngOnInit(): void {
    this.climaService.obtenerPronostico().subscribe((data) => {
      const datos = data.list.slice(0, 15).map((p: any) => {
        const fecha = new Date(p.dt * 1000);
        return {
          temp: Math.round(p.main.temp),
          descripcion: p.weather[0].main,
          hora: fecha.toLocaleTimeString([], { hour: 'numeric', hour12: true }),
          periodo: fecha.toLocaleTimeString([], { hour12: true }).includes("AM") ? "AM" : "PM",
          lluvia: p.rain?.['3h'] ?? 0
        };
      });

      for (let i = 0; i < datos.length; i += 5) {
        this.pronosticoAgrupado.push(datos.slice(i, i + 5));
      }
    });
  }
  getIconoClima(descripcion: string): string {
    switch (descripcion.toLowerCase()) {
      case 'clear':
      case 'sun':
        return 'bi bi-sun';
      case 'clouds':
        return 'bi bi-cloud';
      case 'rain':
        return 'bi bi-cloud-rain-heavy';
      default:
        return 'bi bi-cloud-fog';
    }
  }

}
