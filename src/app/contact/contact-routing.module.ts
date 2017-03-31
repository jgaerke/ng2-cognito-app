import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContactExplorerComponent} from './component/contact-explorer/contact-explorer.component';
import {SessionInitializationGuard} from "../core/guard/session-initialization.guard";

const routes: Routes = [
  {
    path: 'explorer',
    component: ContactExplorerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SessionInitializationGuard]
})
export class ContactRoutingModule {
}
