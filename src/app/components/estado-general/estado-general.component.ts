import { NgIf } from '@angular/common';
import { ClimaService } from './../../services/clima.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-estado-general',
  standalone: true,
  templateUrl: './estado-general.component.html',
  styleUrls: ['./estado-general.component.css'],
  imports: [NgIf]
})
export class EstadoGeneralComponent implements OnInit {
  estado: any = null;

  constructor(private ClimaService: ClimaService) {}

  ngOnInit(): void {
    this.ClimaService.obtenerClimaActual().subscribe((data) => {
      this.estado = {
        tipo: data.weather[0].main,
        descripcion: data.weather[0].description,
        fecha: new Date().toLocaleString(),
        intensidad: data.rain?.['1h'] ? `${data.rain['1h']} mm/h` : '0 mm/h',
        visibilidad: `${data.visibility / 1000} km`,
        viento: `${data.wind.speed} km/h`
      };
    });
  }
}
