import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoGeneralComponent } from './estado-general.component';

describe('EstadoGeneralComponent', () => {
  let component: EstadoGeneralComponent;
  let fixture: ComponentFixture<EstadoGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoGeneralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
