import { TestBed } from '@angular/core/testing';

import { ActivitycrudService } from './activitycrud.service';

describe('ActivitycrudService', () => {
  let service: ActivitycrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitycrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
