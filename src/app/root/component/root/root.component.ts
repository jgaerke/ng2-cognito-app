import {Component} from "@angular/core";
import {AccountEvents} from "../../../account/event/account.events";
import {EventService} from "../../../core/eventing/service/event.service";
import {ComponentBase} from "../../../core/component/component.base";
import {ComponentEventHandler} from "../../../core/component/component.event.handler";
import {AccountService} from "../../../account/service/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent extends ComponentBase {
  title = 'app works!';
  authenticated = false;

  constructor(eventService: EventService, private accountService: AccountService, private router: Router) {
    super(eventService);
  }

  onAuthenticationChanged(authenticated: boolean) {
    this.authenticated = authenticated;
  }

  getGlobalEventHandlers(): Array<ComponentEventHandler<any>> {
    return [{
      key: AccountEvents.AuthenticationChangeEvent,
      handler: {next: (authenticated: any) => this.onAuthenticationChanged(authenticated)}
    }];
  }

  signOut() {
    this.accountService.signOut();
    this.router.navigate(['account/sign-in']);
  }


}
