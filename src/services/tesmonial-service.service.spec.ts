import { TestBed } from '@angular/core/testing';

import { TesmonialServiceService } from './tesmonial-service.service';

describe('TesmonialServiceService', () => {
  let service: TesmonialServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TesmonialServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
