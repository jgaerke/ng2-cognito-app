import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventingModule} from './eventing/eventing.module';
import {CognitoService} from './service/cognito/cognito.service';
import {SessionService} from './service/session/session.service';
import {CookieService} from './service/cookie/cookie.service';
import {LocalStorageService} from './service/storage/local-storage.service';

@NgModule({
  imports: [
    CommonModule,
    EventingModule
  ],
  declarations: [],
  providers: [
    CognitoService,
    CookieService,
    LocalStorageService,
    SessionService
  ]
})
export class CoreModule {
}
