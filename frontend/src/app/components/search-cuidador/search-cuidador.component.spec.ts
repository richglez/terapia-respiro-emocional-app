import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCuidadorComponent } from './search-cuidador.component';

describe('SearchCuidadorComponent', () => {
  let component: SearchCuidadorComponent;
  let fixture: ComponentFixture<SearchCuidadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchCuidadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchCuidadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
