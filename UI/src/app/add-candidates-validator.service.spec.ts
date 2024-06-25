import { TestBed } from '@angular/core/testing';

import { AddCandidatesValidatorService } from './add-candidates-validator.service';

describe('AddCandidatesValidatorService', () => {
  let service: AddCandidatesValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCandidatesValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
