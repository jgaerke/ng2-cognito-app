import {TestBed, inject} from '@angular/core/testing';
import {SessionInitializationGuard} from './session-initialization.guard';

describe('SessionInitializationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionInitializationGuard]
    });
  });

  it('should ...', inject([SessionInitializationGuard], (guard: SessionInitializationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
