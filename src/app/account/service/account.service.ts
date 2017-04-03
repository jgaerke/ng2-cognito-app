import {Injectable} from '@angular/core';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
  ISignUpResult
} from 'amazon-cognito-identity-js';
import {Observable} from 'rxjs/Observable';
import {Credentials} from '../model/credentials';
import {Account} from '../model/account';
import {email} from 'ng2-validation/dist/email';
import {EventService} from '../../core/eventing/service/event.service';
import {AccountEvents} from '../event/account.events';
import {CognitoService} from '../../core/service/cognito/cognito.service';
import {SessionService} from '../../core/service/session/session.service';

@Injectable()
export class AccountService {

  private account: Account;

  constructor(private eventService: EventService,
              private cognitoService: CognitoService,
              private sessionService: SessionService) {
    this.account = new Account(null, false);
    this.eventService.subscribe(AccountEvents.AuthenticationChangeEvent, {
      next: (data) => {
        this.onAuthenticationChange(data);
      }
    });
  }

  onAuthenticationChange(data) {
    this.account = new Account(data.email, data.authenticated);
  }

  register(credentials: Credentials): Observable<Account> {
    const attributes = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: credentials.email
      })
    ];
    return Observable.create((observer) => {
      const cognitoUserPool = this.cognitoService.getUserPool();
      cognitoUserPool.signUp(credentials.email, credentials.password, attributes, null, (err: any, result: ISignUpResult) => {
        if (err) {
          observer.error(err);
          return;
        }
        this.account = new Account(credentials.email, false);
        observer.next(this.account);
        observer.complete();
      });
    });
  }

  confirmRegistration(code): Observable<void> {
    return <Observable<void>>Observable.create((observer) => {
      const cognitoUserPool = this.cognitoService.getUserPool();
      const cognitoUser = cognitoUserPool.getCurrentUser();
      if (cognitoUser === null) {
        alert('user not present');
        observer.error('user not present');
        return;
      }
      cognitoUser.confirmRegistration(code, true, (err) => {
        if (err) {
          observer.error(err);
          return;
        }
        observer.next();
        observer.complete();
      });
    });
  }

  resendRegistrationCode(email): Observable<void> {
    return <Observable<void>>Observable.create((observer) => {
      const cognitoUserPool = this.cognitoService.getUserPool();
      const cognitoUser = cognitoUserPool.getCurrentUser();
      if (cognitoUser === null) {
        alert('user not present');
        observer.error('user not present');
        return;
      }
      cognitoUser.resendConfirmationCode((err) => {
        if (err) {
          observer.error(err);
          return;
        }
        observer.next();
        observer.complete();
      });
    });
  }

  signIn(credentials: Credentials): Observable<Account> {
    return Observable.create((observer) => {
      const cognitoUserPool = this.cognitoService.getUserPool();
      const cognitoUser = new CognitoUser({
        Username: credentials.email,
        Pool: cognitoUserPool
      });
      cognitoUser.authenticateUser(new AuthenticationDetails({
        Username: credentials.email,
        Password: credentials.password
      }), {
        onSuccess: (result) => {
          this.eventService.publish(AccountEvents.AuthenticationChangeEvent, {
            email: credentials.email,
            authenticated: false
          });
          this.sessionService
            .loadFromLocalStorage(['CognitoIdentityServiceProvider'])
            .persistToCookies(['CognitoIdentityServiceProvider']);
          observer.next(result);
          observer.complete();
        },
        onFailure: function (err) {
          observer.error(err);
          alert(err);
        }
      });
    });
  }

  signOut() {
    const cognitoUserPool = this.cognitoService.getUserPool();
    const cognitoUser = cognitoUserPool.getCurrentUser();
    if (cognitoUser === null) {
      return;
    }
    cognitoUser.signOut();
    this.sessionService.clear(true, true, ['CognitoIdentityServiceProvider']);
    this.eventService.publish(AccountEvents.AuthenticationChangeEvent, {email: null, authenticated: false});
  }
}
