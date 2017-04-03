import {ComponentEventHandler} from './component.event.handler';
import {OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {EventService} from '../eventing/service/event.service';

export abstract class ComponentBase implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription>;
  private eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
    this.subscriptions = [];
  }


  abstract getGlobalEventHandlers(): Array<ComponentEventHandler<any>>;

  ngOnInit(): void {
    const eventHandlers = this.getGlobalEventHandlers();
    if (eventHandlers) {
      eventHandlers.forEach((eventHandler) => {
        this.subscriptions.push(this.eventService.subscribe(eventHandler.key, eventHandler.handler));
      });
    }

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

}
