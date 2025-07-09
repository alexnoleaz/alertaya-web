import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

declare var VANTA: any;

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink],
  templateUrl: './landing.page.html',
  styleUrl: './landing.page.css',
})
export class LandingPage implements AfterViewInit, OnDestroy {
  @ViewChild('logeoa') logeoSection!: ElementRef;
  private vantaEffect: any;

  ngAfterViewInit(): void {
    const fondo = document.getElementById('hero');
    if (fondo) {
      this.vantaEffect = VANTA.WAVES({
        el: fondo,
        mouseControls: true,
        touchControls: true,
        minHeight: 400.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x666666, // ondas gris oscuro
        shininess: 150.0, // más reflejo
        waveHeight: 35.0, // olas más altas
        waveSpeed: 1.5, // animación más fluida
        zoom: 0.9,
      });
    }
  }

  ngOnDestroy(): void {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
    }
  }

  scrollToLogeo() {
    this.logeoSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
