import { TestBed } from '@angular/core/testing';

import { AddVacanciesValidatorService } from './add-vacancies-validator.service';

describe('AddVacanciesValidatorService', () => {
  let service: AddVacanciesValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddVacanciesValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
