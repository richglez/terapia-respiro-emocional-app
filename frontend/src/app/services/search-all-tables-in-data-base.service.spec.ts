import { TestBed } from '@angular/core/testing';

import { SearchAllTablesInDataBaseService } from './search-all-tables-in-data-base.service';

describe('SearchAllTablesInDataBaseService', () => {
  let service: SearchAllTablesInDataBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchAllTablesInDataBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
