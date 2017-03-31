import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EventService} from "./service/event.service";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [EventService]
})
export class EventingModule {
}
