import { ClimaService } from './../../services/clima.service';
import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pronostico-horas',
  imports: [NgFor],
  templateUrl: './pronostico-horas.component.html',
  styleUrl: './pronostico-horas.component.css',
  standalone: true
})
export class PronosticoHorasComponent {
pronostico: any[] = [];

  constructor(private climaService: ClimaService) {}

  ngOnInit(): void {
    this.climaService.obtenerPronostico().subscribe((data) => {
      this.pronostico = data.list.slice(0, 4).map((p: any) => ({
        hora: new Date(p.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        intensidad: this.getIntensidad(p.rain?.['3h']),
        valor: p.rain?.['3h'] ?? 0
      }));
    });
  }

  getIntensidad(valor: number): string {
  if (!valor || valor === 0) return 'Sin alerta';
  if (valor <= 2.5) return 'Suave';
  if (valor <= 7.6) return 'Moderada';
  return 'Fuerte';
}


  getColor(intensidad: string): string {
    switch (intensidad) {
      case 'Fuerte': return 'danger';
      case 'Moderada': return 'warning';
      case 'Suave': return 'info';
      default: return 'success';
    }
  }
}
