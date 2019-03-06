import { TestBed } from '@angular/core/testing';

import { JobsFetchServiceService } from './jobs-fetch-service.service';

describe('JobsFetchServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobsFetchServiceService = TestBed.get(JobsFetchServiceService);
    expect(service).toBeTruthy();
  });
});
