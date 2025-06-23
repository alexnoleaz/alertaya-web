import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecargaService {
  private recargaSubject = new Subject<void>();

  // Observable al que se suscriben los componentes
  recargar$ = this.recargaSubject.asObservable();

  // Método para emitir evento de recarga
  emitirRecarga() {
    this.recargaSubject.next();
  }
}
