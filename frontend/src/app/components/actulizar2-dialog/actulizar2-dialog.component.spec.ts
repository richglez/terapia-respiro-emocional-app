import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actulizar2DialogComponent } from './actulizar2-dialog.component';

describe('Actulizar2DialogComponent', () => {
  let component: Actulizar2DialogComponent;
  let fixture: ComponentFixture<Actulizar2DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Actulizar2DialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Actulizar2DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
