import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { APP_ID, Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { environment } from '../environments/environment';
const isBot = require('isbot-fast');

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              @Inject(APP_ID) private appId: string,
              @Inject(DOCUMENT) private document: Document,
              @Optional() @Inject('USER_AGENT') private userAgent: string) { }
  
  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  isServer(): boolean {
    return isPlatformServer(this.platformId);
  }
  
  isBot(): boolean {
    return environment.forceBotMode ? true : isBot(this.getUserAgent());
  }

  getPlatform(): 'browser'|'server'|undefined {
    return this.isBrowser() ? 'browser' : (this.isServer() ? 'server' : undefined);
  }

  getAppId(): string {
    return this.appId;
  }

  getPageUrl() {
    return this.document.location.href;
  }

  getPageCanonicalUrl() {
    return `${this.getPageOrigin()}${this.document.location.pathname}`;
  }

  getPageOrigin() {
    return this.document.location.origin;
  }

  getUserAgent(): string {
    return this.userAgent;
  }

}
