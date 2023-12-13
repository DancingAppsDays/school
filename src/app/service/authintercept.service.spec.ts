import { TestBed } from '@angular/core/testing';

import { AuthinterceptService } from './authintercept.service';

describe('AuthinterceptService', () => {
  let service: AuthinterceptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthinterceptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
