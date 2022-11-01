import { TestBed } from '@angular/core/testing';

import { AllowanceTypesService } from './allowance-types.service';

describe('AllowanceTypesService', () => {
  let service: AllowanceTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllowanceTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
