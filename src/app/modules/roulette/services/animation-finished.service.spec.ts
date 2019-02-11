import { TestBed } from '@angular/core/testing';

import { AnimationFinishedService } from './animation-finished.service';

describe('AnimationFinishedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnimationFinishedService = TestBed.get(AnimationFinishedService);
    expect(service).toBeTruthy();
  });
});
