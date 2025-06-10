import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PronosticoHorasComponent } from './pronostico-horas.component';

describe('PronosticoHorasComponent', () => {
  let component: PronosticoHorasComponent;
  let fixture: ComponentFixture<PronosticoHorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PronosticoHorasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PronosticoHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
