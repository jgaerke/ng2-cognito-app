import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { SignupComponent } from './component/signup/signup.component';
import { SigninComponent } from './component/signin/signin.component';
import { ConfirmSignupComponent } from './component/confirm-signup/confirm-signup.component';
import { AccountService } from './service/account.service';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    AccountRoutingModule,
  ],
  declarations: [SignupComponent, SigninComponent, ConfirmSignupComponent],
  providers: [AccountService]

})
export class AccountModule { }
