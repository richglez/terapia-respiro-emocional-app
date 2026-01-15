import { TestBed } from '@angular/core/testing';

import { CuidadoresServiceService } from './cuidadores-service.service';

describe('CuidadoresServiceService', () => {
  let service: CuidadoresServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuidadoresServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
