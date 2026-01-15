import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioServiciosComponent } from './calendario-servicios.component';

describe('CalendarioServiciosComponent', () => {
  let component: CalendarioServiciosComponent;
  let fixture: ComponentFixture<CalendarioServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarioServiciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendarioServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
