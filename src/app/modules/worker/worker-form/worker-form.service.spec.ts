import { TestBed } from '@angular/core/testing';

import { UniversitiesService } from './universities.service';

describe('WorkerFormServiceService', () => {
  let service: UniversitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
