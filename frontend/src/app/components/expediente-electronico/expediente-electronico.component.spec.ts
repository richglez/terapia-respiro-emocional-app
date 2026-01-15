import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteElectronicoComponent } from './expediente-electronico.component';

describe('ExpedienteElectronicoComponent', () => {
  let component: ExpedienteElectronicoComponent;
  let fixture: ComponentFixture<ExpedienteElectronicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpedienteElectronicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpedienteElectronicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
