import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPacienteComponent } from './search-paciente.component';

describe('SearchPacienteComponent', () => {
  let component: SearchPacienteComponent;
  let fixture: ComponentFixture<SearchPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchPacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
