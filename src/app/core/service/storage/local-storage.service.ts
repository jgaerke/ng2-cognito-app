import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {

  containsKey(key: string): boolean {
    return !!this.get(key);
  }

  add(key: string, value: any, expiresInMillis?: number): LocalStorageService {
    localStorage.setItem(key, value);
    return this;
  }

  get(key: string, mapper?: (input: any) => any): string {
    const defaultMapper = (input) => input;
    mapper = mapper || defaultMapper;
    return mapper.call(this, localStorage.getItem(key));
  }

  remove(key: string): LocalStorageService {
    localStorage.removeItem(key);
    return this;
  }

  clear(keyPatternsToClear: Array<string> = []): LocalStorageService {
    this.getKeys()
      .filter((key: string) => {
        return keyPatternsToClear.length === 0 || keyPatternsToClear.find((keyPatternToClear) => {
            return key.indexOf(keyPatternToClear) === 0;
          }) !== undefined;
      })
      .forEach((key: string) => {
        this.remove(key);
      });
    return this;
  }

  getKeys(): Array<string> {
    return Object.keys(localStorage);
  }
}
