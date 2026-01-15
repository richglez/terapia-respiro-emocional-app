import { TestBed } from '@angular/core/testing';

import { SuplenciasServiceService } from './suplencias-service.service';

describe('SuplenciasServiceService', () => {
  let service: SuplenciasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuplenciasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
