import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Credentials} from '../../model/credentials';
import {AccountService} from '../../service/account.service';
import {CognitoUser} from 'amazon-cognito-identity-js';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  model: any;

  constructor(private accountService: AccountService, private router: Router) {
  }

  ngOnInit(): void {
    this.model = {
      processing: false
    };
  }

  onSubmit(value: any, valid: boolean) {
    this.model.processing = true;

    if (!valid) {
      this.model.processing = false;
      return;
    }

    this.accountService.register(new Credentials(value.email, value.password, false))
      .subscribe(
        () => {
          console.log('sign up success');
          this.router.navigate(['account/confirm-sign-up']);
          this.model.processing = false;
        },
        (error) => {
          console.log('sign up error', error);
          alert(error);
          this.model.processing = false;
        }
      );
  }

}
