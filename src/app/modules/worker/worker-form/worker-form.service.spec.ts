import { TestBed } from '@angular/core/testing';

import { WorkerFormService } from './worker-form.service';

describe('WorkerFormServiceService', () => {
  let service: WorkerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
