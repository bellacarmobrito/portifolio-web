import { TestBed } from '@angular/core/testing';

import { TechIcon } from './tech-icon';

describe('TechIcon', () => {
  let service: TechIcon;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechIcon);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
