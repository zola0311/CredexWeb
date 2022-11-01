import { TestBed } from '@angular/core/testing';

import { ValueStreamsService } from './value-streams.service';

describe('ValueStreamsService', () => {
  let service: ValueStreamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueStreamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
