import { TestBed, inject } from '@angular/core/testing';

import { ServcreatedService } from './servcreated.service';

describe('ServcreatedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServcreatedService]
    });
  });

  it('should be created', inject([ServcreatedService], (service: ServcreatedService) => {
    expect(service).toBeTruthy();
  }));
});
