import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDatosComponent } from './base-datos.component';

describe('BaseDatosComponent', () => {
  let component: BaseDatosComponent;
  let fixture: ComponentFixture<BaseDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseDatosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
