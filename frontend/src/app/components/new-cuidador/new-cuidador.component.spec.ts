import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCuidadorComponent } from './new-cuidador.component';

describe('NewCuidadorComponent', () => {
  let component: NewCuidadorComponent;
  let fixture: ComponentFixture<NewCuidadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewCuidadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewCuidadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
