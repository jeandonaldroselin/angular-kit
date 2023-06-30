import { Inject, Injectable, Optional } from '@angular/core';
import { Request, Response } from 'express';

@Injectable({
  providedIn: 'root'
})

export class CookieService {

  cookies: any = {};
  document: any = { cookie: '' };

  constructor(
    @Optional() @Inject('REQUEST') private req: Request<any>,
    @Optional() @Inject('RESPONSE') private res: Response<any>
  ) {
    if (this.req !== null && this.req.headers && this.req.headers.cookie) {
      const cookiesArray = this.req.headers.cookie.split('; ');
      cookiesArray.map((row) => {
        const splitedRow = row.split('=');
        this.cookies[splitedRow[0]] = splitedRow[1];
      });
    } else {
      this.document = document;
    }
  }

  clear() {
    if (this.req !== null) {
      return false;
    }
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    return true;
  }

  getItem(name: string): any {
    const cookies: { [key: string]: string | null } = this._getPairs();
    if (name && cookies && Object.keys(cookies).length !== 0 && typeof cookies[name] !== 'undefined') {
      let output;
      const value = cookies[name];
      try {
        output = typeof value === 'string' ? JSON.parse(this.unformatValue(value)) : '';
      } catch(e) {
        output = typeof value === 'string' ? this.unformatValue(value) : '';
      }
      return output;
    }
    return null;
  }

  setItem(
    name: string,
    value: any,
    expiry?: Date | string,
    path?: string
  ): boolean {
    if (!name) {
      return false;
    }
    if (!path) {
      path = '/';
    }
    const formattedValue = this.formatValue(value);
    if (this.req === null) {
      let expiryStr = '';
      if (expiry) {
        if (!(expiry instanceof Date)) {
          expiry = new Date(expiry);
        }
        expiryStr = '; expires=' + expiry.toUTCString();
      }
      this.document.cookie = `${name}=${formattedValue}${expiryStr}; path=${path}`;
    } else {
      if (expiry) {
        if (!(expiry instanceof Date)) {
          expiry = new Date(expiry);
        }
        const dt = new Date();
        if (expiry.getTime() <= dt.getTime()) {
          this.removeItem(name, path);
        } else {
          this.cookies[name] = formattedValue;
          this.res.cookie(name, formattedValue, {
            expires: expiry,
            path,
            encode: String,
          });
        }
      } else {
        this.cookies[name] = formattedValue;
        this.res.cookie(name, formattedValue, { path, encode: String });
      }
    }
    return true;
  }

  removeItem(name: string, path?: string): boolean {
    if (this.req !== null || !name) {
      return false;
    }
    if (!path) {
      path = '/';
    }
    if (this.req === null) {
      this.document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
    } else {
      this.cookies[name] = null;
      const expiry = new Date('Thu, 01 Jan 1970 00:00:00 UTC');
      this.res.cookie(name, null, { expires: expiry, path, encode: String });
    }
    return true;
  }

  private formatValue(value: any): string {
    // Replace ; and = signs by theses placeholders : |sep-dot-com| and |sep-equ|
    const isNotNullOrUndefined = value != null && value != undefined;
    const isTypeOfString = typeof value === 'string';
    return isNotNullOrUndefined ? (isTypeOfString ? value : JSON.stringify(value)).split(';').join('|sep-dot-com|').split('=').join('|sep-equ|') : value;
  }

  private unformatValue(value: string): string {
    // Replace |sep-dot-com| and |sep-equ| placeholders by ; and = signs
    const isNotNullOrUndefined = value != null && value != undefined;
    return isNotNullOrUndefined ? value.split('|sep-dot-com|').join(';').split('|sep-equ|').join('=') : value;
  }

  _getPairs(): { [key: string]: string | null } {
    if (this.req === null) {
      const parsed = this.document.cookie.split('; ');
      const cookies: { [key: string]: string | null } = {};
      parsed.forEach((element: string) => {
        if (element) {
          const pair = element.split('=');
          cookies[pair[0]] = typeof pair[1] !== 'undefined' ? pair[1] : null;
        }
      });
      return cookies;
    } else {
      return this.cookies;
    }
  }

}

