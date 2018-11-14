import { TestBed, inject } from '@angular/core/testing';

import { ServicesgetService } from './servicesget.service';

describe('ServicesgetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicesgetService]
    });
  });

  it('should be created', inject([ServicesgetService], (service: ServicesgetService) => {
    expect(service).toBeTruthy();
  }));
});
