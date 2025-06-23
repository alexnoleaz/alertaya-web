import { RecargaService } from './../../services/recarga.service';
import { ClimaService } from './../../services/clima.service';
import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-estado-general',
  standalone: true,
  templateUrl: './estado-general.component.html',
  styleUrls: ['./estado-general.component.css'],
  imports: [NgIf]
})
export class EstadoGeneralComponent implements OnInit {
  estado: any = null;

  constructor(
    private ClimaService: ClimaService,
    private RecargaService: RecargaService // 👈 inyectamos el servicio de recarga
  ) {}

  ngOnInit(): void {
    this.cargarDatos();

    // Nos suscribimos a eventos de recarga
    this.RecargaService.recargar$.subscribe(() => {
      this.cargarDatos();
    });
  }
 getNivel(valor: number): string {
  if (!valor || valor === 0) return 'Sin alerta';
  if (valor <= 2.5) return 'Suave';
  if (valor <= 7.6) return 'Moderada';
  return 'Fuerte';
}


  cargarDatos(): void {
    this.ClimaService.obtenerClimaActual().subscribe((data) => {
      this.estado = {
        tipo: data.weather[0].main,
        descripcion: data.weather[0].description,
        fecha: new Date().toLocaleString(),
        intensidad: data.rain?.['1h'] ? `${data.rain['1h']} mm/h` : '0 mm/h',
        visibilidad: `${data.visibility / 1000} km`,
        viento: `${data.wind.speed} km/h`,
        nivel: this.getNivel(data.rain?.['1h'] ?? 0)
      };
    });
  }
}
