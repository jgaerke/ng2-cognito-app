import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {CoreModule} from '../core/core.module';
import {RootRoutingModule} from './root-routing.module';
import {RootComponent} from './component/root/root.component';
import {AccountService} from '../account/service/account.service';

@NgModule({
  declarations: [
    RootComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CoreModule,
    RootRoutingModule
  ],
  providers: [AccountService],
  bootstrap: [RootComponent]
})
export class BootstrapModule {
}
