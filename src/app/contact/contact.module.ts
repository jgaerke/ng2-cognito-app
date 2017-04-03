import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactExplorerComponent } from './component/contact-explorer/contact-explorer.component';
import {ContactRoutingModule} from './contact-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ContactRoutingModule
  ],
  declarations: [ContactExplorerComponent]
})
export class ContactModule { }
