import {PartialObserver} from 'rxjs/Observer';

export interface ComponentEventHandler<T> {
  key: string;
  handler: PartialObserver<T>;
}
