import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodasReservacionesComponent } from './todas-reservaciones.component';

describe('TodasReservacionesComponent', () => {
  let component: TodasReservacionesComponent;
  let fixture: ComponentFixture<TodasReservacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodasReservacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodasReservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
