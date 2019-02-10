import { TestBed } from '@angular/core/testing';

import { RoulletService } from './roullet.service';

describe('RoulletService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoulletService = TestBed.get(RoulletService);
    expect(service).toBeTruthy();
  });
});
