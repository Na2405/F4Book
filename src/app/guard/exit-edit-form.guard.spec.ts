import { TestBed } from '@angular/core/testing';

import { ExitEditFormGuard } from './exit-edit-form.guard';

describe('ExitEditFormGuard', () => {
  let guard: ExitEditFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExitEditFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
