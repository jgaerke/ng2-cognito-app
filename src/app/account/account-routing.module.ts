import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignupComponent} from './component/signup/signup.component';
import {SigninComponent} from './component/signin/signin.component';
import {ConfirmSignupComponent} from './component/confirm-signup/confirm-signup.component';

const routes: Routes = [
  {
    path: 'sign-up',
    component: SignupComponent
  },
  {
    path: 'sign-in',
    component: SigninComponent
  },
  {
    path: 'confirm-sign-up',
    component: ConfirmSignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
