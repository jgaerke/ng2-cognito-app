import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AccountService} from '../../service/account.service';

@Component({
  selector: 'app-confirm-signup',
  templateUrl: './confirm-signup.component.html',
  styleUrls: ['./confirm-signup.component.css']
})
export class ConfirmSignupComponent implements OnInit {

  public model: any;

  constructor(private accountService: AccountService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.model = {
      processing: false
    };
  }

  onSubmit(value: any, valid: boolean) {
    this.accountService.confirmRegistration(value.confirmationCode)
      .subscribe(
        () => {
          console.log('confirmation success');
          this.router.navigateByUrl('account/sign-in');
        },
        (error) => {
          console.log('confirmation error', error);
          alert(error);
        }
      );
  }
}
