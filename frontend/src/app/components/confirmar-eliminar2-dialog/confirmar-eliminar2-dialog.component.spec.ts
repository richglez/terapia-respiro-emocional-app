import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarEliminar2DialogComponent } from './confirmar-eliminar2-dialog.component';

describe('ConfirmarEliminar2DialogComponent', () => {
  let component: ConfirmarEliminar2DialogComponent;
  let fixture: ComponentFixture<ConfirmarEliminar2DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmarEliminar2DialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmarEliminar2DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
