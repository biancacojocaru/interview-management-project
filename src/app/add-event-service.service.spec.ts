import { TestBed } from '@angular/core/testing';

import { AddEventServiceService } from './add-event-service.service';

describe('AddEventServiceService', () => {
  let service: AddEventServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddEventServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
