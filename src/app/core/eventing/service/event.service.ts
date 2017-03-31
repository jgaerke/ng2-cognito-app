import {Subject, Subscription} from "rxjs/Rx";
import {PartialObserver} from "rxjs/Observer";
import {Event} from "../model/event";
import {Injectable} from "@angular/core";

@Injectable()
export class EventService {
  private bus: Subject<Event>;

  constructor() {
    this.bus = new Subject<Event>();
  }

  publish(key: string, data?: any): void {
    this.bus.next({key, data});
  }

  subscribe<T>(key: string, subscriber: PartialObserver<T>): Subscription {
    return this.bus.asObservable()
      .filter((event) => event.key === key)
      .map(event => event.data)
      .subscribe(subscriber);
  }


  subscribeNext<T>(key: string, next: (value: T) => void) {
    return this.bus.asObservable()
      .filter((event) => event.key === key)
      .map(event => event.data)
      .subscribe(next, null, null);
  }

}
