import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertasDistritoComponent } from '../components/alertas-distrito/alertas-distrito.component';
import { EstadoGeneralComponent } from '../components/estado-general/estado-general.component';
import { MapaAlertasComponent } from '../components/mapa/mapa-alertas.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { PronosticoHorasComponent } from '../components/pronostico-horas/pronostico-horas.component';
import { RecomendacionesComponent } from '../components/recomendaciones/recomendaciones.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    AlertasDistritoComponent,
    EstadoGeneralComponent,
    MapaAlertasComponent,
    PronosticoHorasComponent,
    RecomendacionesComponent,
  ],
  templateUrl: './home.page.html',
})
export class HomePage {}
