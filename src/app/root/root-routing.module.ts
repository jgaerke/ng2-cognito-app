import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SessionInitializationGuard} from '../core/guard/session-initialization.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'contact/explorer',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: 'app/account/account.module#AccountModule',
    canLoad: [SessionInitializationGuard]
  },
  {
    path: 'contact',
    loadChildren: 'app/contact/contact.module#ContactModule',
    canLoad: [SessionInitializationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SessionInitializationGuard]
})
export class RootRoutingModule {
}
