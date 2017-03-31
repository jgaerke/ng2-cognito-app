import {Injectable} from "@angular/core";
import {CanLoad, Route} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {SessionService} from "../service/session/session.service";
import {LocalStorageService} from "../service/storage/local-storage.service";

@Injectable()
export class SessionInitializationGuard implements CanLoad {

  constructor(private sessionService: SessionService) {
  }

  canLoad(next: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.sessionService
      .clear(true, false, ['CognitoIdentityServiceProvider'])
      .loadFromCookies(['CognitoIdentityServiceProvider'])
      .persistToLocalStorage(['CognitoIdentityServiceProvider'])
      .initialize()
      .map((session) => {
        console.log('current session', this.sessionService.getSession());
        return true;
      });
  }
}
