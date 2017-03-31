import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Credentials} from '../../model/credentials';
import {AccountService} from '../../service/account.service';
import {CognitoUser} from 'amazon-cognito-identity-js';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit  {
  model: any;

  constructor(private accountService: AccountService, private router: Router) {
  }

  ngOnInit(): void {
    this.model = {
      processing: false
    }
  }

  onSubmit(value: any, valid: boolean) {
    this.model.processing = true;

    if (!valid) {
      this.model.processing = false;
      return;
    }

    this.accountService.signIn(new Credentials(value.email, value.password, value.rememberMe))
      .subscribe(
        () => {
          console.log('sign in success!');
          this.router.navigate(['']);
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
