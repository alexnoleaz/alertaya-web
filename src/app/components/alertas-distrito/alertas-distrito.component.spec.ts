import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertasDistritoComponent } from './alertas-distrito.component';

describe('AlertasDistritoComponent', () => {
  let component: AlertasDistritoComponent;
  let fixture: ComponentFixture<AlertasDistritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertasDistritoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertasDistritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
