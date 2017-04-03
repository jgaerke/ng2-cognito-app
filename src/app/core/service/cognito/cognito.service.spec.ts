import {TestBed, inject} from '@angular/core/testing';
import {CognitoService} from './cognito.service';

describe('CognitoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CognitoService]
    });
  });

  it('should ...', inject([CognitoService], (service: CognitoService) => {
    expect(service).toBeTruthy();
  }));
});
