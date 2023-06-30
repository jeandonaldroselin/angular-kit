export class CookieBrowserOnlyService {

  cookies: any = {};
  document: any = { cookie: '' };
  isServer: boolean;

  constructor() {
    const localWindow: any = window;
    this.isServer = localWindow['isServer'];
    if(!this.isServer) {
      this.document = document;
    }
  }

  clear() {
    if(!this.isServer) {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          var eqPos = cookie.indexOf("=");
          var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    }
    return true;
  }

  getItem(name: string): any {
    if(!this.isServer) {
      const cookies: { [key: string]: string | null } = this._getPairs();
      if (name && cookies && Object.keys(cookies).length !== 0 && typeof cookies[name] !== 'undefined') {
        const value = cookies[name];
        const output = value ? this.unformatValue(value) : null;
        return output;
      }
    }
    return null;
  }

  setItem(
    name: string,
    value: any,
    expiry?: Date | string,
    path?: string
  ): boolean {
    if(!this.isServer) {
      if (!name) {
        return false;
      }
      if (!path) {
        path = '/';
      }
      const formattedValue = this.formatValue(value);
      let expiryStr = '';
      if (expiry) {
        if (!(expiry instanceof Date)) {
          expiry = new Date(expiry);
        }
        expiryStr = '; expires=' + expiry.toUTCString();
      }
      document.cookie = `${name}=${formattedValue}${expiryStr}; path=${path}`;
    }
    return true;
  }

  removeItem(name: string, path?: string): boolean {
    if (!name) {
      return false;
    }
    if(!this.isServer) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
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
    if(!this.isServer) {
        const parsed = document.cookie.split('; ');
        const cookies: { [key: string]: string | null } = {};
        parsed.forEach((element: string) => {
          if (element) {
            const pair = element.split('=');
            cookies[pair[0]] = typeof pair[1] !== 'undefined' ? pair[1] : null;
          }
        });
        return cookies;
    }
    return {};
  }

  // TODO : Implement
  get length() {
    /*if(!this.isServer) {
      return this._getPairs();
    }*/
    return 0;
  }

  // TODO : Implement
  key() {
    return '';
  }

}

