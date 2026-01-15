import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaSuplenciaDialogComponent } from './nueva-suplencia-dialog.component';

describe('NuevaSuplenciaDialogComponent', () => {
  let component: NuevaSuplenciaDialogComponent;
  let fixture: ComponentFixture<NuevaSuplenciaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NuevaSuplenciaDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevaSuplenciaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
