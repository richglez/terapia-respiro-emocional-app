import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarDialogComponent } from './actualizar-dialog.component';

describe('ActualizarDialogComponent', () => {
  let component: ActualizarDialogComponent;
  let fixture: ComponentFixture<ActualizarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizarDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
