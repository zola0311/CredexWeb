import { TestBed } from '@angular/core/testing';

import { AbsenceTypesService } from './absence-types.service';

describe('AbsenceTypesService', () => {
  let service: AbsenceTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsenceTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
