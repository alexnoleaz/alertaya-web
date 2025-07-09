import { ClimaService } from './../../services/clima.service';
import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-estado-general',
  standalone: true,
  templateUrl: './estado-general.component.html',
  imports: [NgIf],
})
export class EstadoGeneralComponent implements OnInit {
  estado: any = null;

  constructor(private ClimaService: ClimaService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  private traducirTipo(tipo: string): string {
    const traducciones: { [clave: string]: string } = {
      Clear: 'Despejado',
      Clouds: 'Nublado',
      Rain: 'Lluvia',
      Drizzle: 'Llovizna',
      Thunderstorm: 'Tormenta eléctrica',
      Snow: 'Nieve',
      Mist: 'Neblina',
      Smoke: 'Humo',
      Haze: 'Bruma',
      Dust: 'Polvo',
      Fog: 'Niebla',
      Sand: 'Arena',
      Ash: 'Ceniza',
      Squall: 'Chubasco',
      Tornado: 'Tornado',
    };

    return traducciones[tipo] || tipo;
  }

  nivel: string = '';
  colorNivel: string = '';

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

  cargarDatos(): void {
    this.ClimaService.obtenerClimaActual().subscribe((data) => {
      this.estado = {
        tipo: this.traducirTipo(data.data.weather[0].main),
        descripcion: data.data.weather[0].description,
        fecha: new Date().toLocaleString(),
        intensidad: data.data.rain?.['1h']
          ? `${data.data.rain['1h']} mm/h`
          : '0 mm/h',
        visibilidad: `${data.data.visibility / 1000} km`,
        viento: `${data.data.wind.speed} km/h`,
      };
    });
  }
}
