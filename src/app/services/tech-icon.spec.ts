import { TestBed } from '@angular/core/testing';

import { TechIconService } from './tech-icon';

describe('TechIconService', () => {
  let service: TechIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
