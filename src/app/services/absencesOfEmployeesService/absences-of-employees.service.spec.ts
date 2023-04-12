import { TestBed } from '@angular/core/testing';

import { AbsencesOfEmployeesService } from './absences-of-employees.service';

describe('AbsencesOfEmployeesService', () => {
  let service: AbsencesOfEmployeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsencesOfEmployeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
