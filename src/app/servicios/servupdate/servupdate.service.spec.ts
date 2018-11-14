import { TestBed, inject } from '@angular/core/testing';

import { ServupdateService } from './servupdate.service';

describe('ServupdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServupdateService]
    });
  });

  it('should be created', inject([ServupdateService], (service: ServupdateService) => {
    expect(service).toBeTruthy();
  }));
});
