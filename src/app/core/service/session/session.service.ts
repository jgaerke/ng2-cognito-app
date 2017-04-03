import {Injectable} from '@angular/core';
import {AccountEvents} from '../../../account/event/account.events';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
  ISignUpResult
} from 'amazon-cognito-identity-js';
import {Observable} from 'rxjs/Observable';
import {CognitoService} from '../cognito/cognito.service';
import {EventService} from '../../eventing/service/event.service';
import {CookieService} from '../cookie/cookie.service';
import {LocalStorageService} from '../storage/local-storage.service';
@Injectable()
export class SessionService {

  private userSession: CognitoUserSession;
  private session: any;

  constructor(private eventService: EventService,
              private cognitoService: CognitoService,
              private cookieService: CookieService,
              private localStorageService: LocalStorageService) {
    this.session = {};
  }

  initialize(): Observable<CognitoUserSession> {
    return Observable.create((observer) => {
      const cognitoUserPool = this.cognitoService.getUserPool();
      const cognitoUser = cognitoUserPool.getCurrentUser();


      if (cognitoUser === null) {
        observer.next();
        observer.complete();
        this.eventService.publish(AccountEvents.AuthenticationChangeEvent, false);
        return;
      }

      if (this.userSession && this.userSession.isValid()) {
        observer.next();
        observer.complete();
        this.eventService.publish(AccountEvents.AuthenticationChangeEvent, {email: null, authenticated: false});
      }

      cognitoUser.getSession((err, session) => {
        if (err) {
          observer.error(err);
          this.eventService.publish(AccountEvents.AuthenticationChangeEvent, {email: null, authenticated: false});
          return;
        }
        if (!session.isValid()) {
          observer.error();
          this.eventService.publish(AccountEvents.AuthenticationChangeEvent, {email: null, authenticated: false});
          return;
        }
        this.userSession = session;
        observer.next(session);
        observer.complete();
        this.eventService.publish(AccountEvents.AuthenticationChangeEvent, {
          email: cognitoUser.getUsername(),
          authenticated: true
        });
      });
    });
  }

  containsKey(key: string): boolean {
    return !!this.get(key);
  }

  add(key: string, value: any): SessionService {
    this.session[key] = value;
    return this;
  }

  get(key: string, mapper?: (input: any) => any): any {
    const defaultMapper = (input) => input;
    mapper = mapper || defaultMapper;
    return mapper.call(this, this.session[key]);
  }

  getSession() {
    return this.session;
  }

  remove(key: string): SessionService {
    delete this.session[key];
    return this;
  }

  getKeys(): Array<string> {
    return Object.keys(this.session);
  }

  clear(includeLocalStorageBackedKeys: boolean,
        includeCookieBackedKeys: boolean,
        keyPatternsToClear: Array<string> = []): SessionService {
    this.getKeys()
      .filter((key: string) => {
        return keyPatternsToClear.length === 0 || keyPatternsToClear.find((keyPatternToClear) => {
            return key.indexOf(keyPatternToClear) === 0;
          }) !== undefined;
      })
      .forEach((key: string) => {
        this.remove(key);
      });
    if (includeLocalStorageBackedKeys) {
      this.localStorageService.clear(keyPatternsToClear);
    }
    if (includeCookieBackedKeys) {
      console.log(keyPatternsToClear);
      this.cookieService.clear(keyPatternsToClear);
    }
    return this;
  }

  loadFromCookies(keyPatternsToLoad: Array<string> = []): SessionService {
    this.cookieService.getKeys()
      .filter((key: string) => {
        return keyPatternsToLoad.length === 0 || keyPatternsToLoad.find((keyPatternToLoad) => {
            return key.indexOf(keyPatternToLoad) === 0;
          }) !== undefined;
      })
      .forEach((key: string) => {
        const cookieEntry = this.cookieService.get(key);
        this.add(key, cookieEntry);
      });
    return this;
  }


  persistToCookies(keyPatternsToPersist: Array<string> = [], expirationInMillis: number = 60 * 60 * 1000): SessionService {
    this.getKeys()
      .filter((key: string) => {
        return keyPatternsToPersist.length === 0 ||
          keyPatternsToPersist.find((keyPatternToPersist) => {
            return key.indexOf(keyPatternToPersist) === 0;
          }) !== undefined;
      })
      .forEach((key: string) => {
        const mapper = (value) => {
          return value;
        };
        this.cookieService.add(key, this.get(key), expirationInMillis);
      });
    return this;
  }

  loadFromLocalStorage(keyPatternsToLoad: Array<string> = []): SessionService {
    this.localStorageService.getKeys()
      .filter((key: string) => {
        return keyPatternsToLoad.length === 0 || keyPatternsToLoad.find((keyPatternToLoad) => {
            return key.indexOf(keyPatternToLoad) === 0;
          }) !== undefined;
      })
      .forEach((key: string) => {
        const localStorageEntry = this.localStorageService.get(key);
        this.add(key, localStorageEntry);
      });
    return this;
  }

  persistToLocalStorage(keyPatternsToPersist: Array<string> = []): SessionService {
    this.getKeys()
      .filter((key: string) => {
        return keyPatternsToPersist.length === 0 ||
          keyPatternsToPersist.find((keyPatternToPersist) => {
            return key.indexOf(keyPatternToPersist) === 0;
          }) !== undefined;
      })
      .forEach((key: string) => {
        const mapper = (value) => {
          return value;
        };
        this.localStorageService.add(key, this.get(key));
      });
    return this;
  }


}
