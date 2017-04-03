import {Injectable} from '@angular/core';

@Injectable()
export class CookieService {

  containsKey(key: string): boolean {
    return !!this.get(key);
  }

  add(key: string, value: any, expiresInMillis?: number): CookieService {
    expiresInMillis = expiresInMillis || 30 * 24 * 60 * 60 * 1000;
    const d = new Date();
    d.setTime(d.getTime() + expiresInMillis);
    const expires = 'expires=' + d.toUTCString();
    document.cookie = key + '=' + value + ';' + expires + ';domain=.checkngo.com;path=/';
    return this;
  }

  get(key: string, mapper?: (input: any) => any): string {
    const defaultMapper = (input) => input;
    mapper = mapper || defaultMapper;
    const name = key + '=';
    const ca = document.cookie.split(';');
    let value = null;
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        value = c.substring(name.length, c.length);
      }
    }
    return mapper.call(this, value);
  }

  remove(key: string): CookieService {
    this.add(key, '', -1);
    return this;
  }

  clear(keyPatternsToClear: Array<string> = []): CookieService {
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
    const cookies = document.cookie.split(';');
    const keys = [];
    for (let i = 0; i < cookies.length; i++) {
      keys.push(cookies[i].split('=')[0].trim());
    }
    return keys;
  }

}
