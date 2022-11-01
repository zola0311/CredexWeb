import { TestBed } from '@angular/core/testing';

import { AllowancesOfEmployeesService } from './allowances-of-employees.service';

describe('AllowancesOfEmployeesService', () => {
  let service: AllowancesOfEmployeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllowancesOfEmployeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
