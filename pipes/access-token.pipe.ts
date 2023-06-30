import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { AuthenticationSelectors } from '@project/features/authentication/store/authentication.selectors';
import { AppState } from '../reducers';
import { CookieService } from '../utils/cookie.service';
import { PlatformService } from '../utils/platform.service';
import { Token } from 'crm-client-api-angular-client';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'accessToken'
})
export class AccessTokenPipe implements PipeTransform {

  constructor(private store: Store<AppState>,
    private cookieService: CookieService,
    private platformService: PlatformService) {}

  async transform(value: any): Promise<string> { 
    return await this.getTokenizedContent(this.getCachelessContent(value));
  }

  getCachelessContent = (data: any) => {
    return `${data}?time=${moment().unix()}`;
  }

  async getTokenizedContent(data: string): Promise<string> {
    let token: Token;
    if(this.platformService.isServer()) {
      const authentication = await this.cookieService.getItem('authentication');
      token = authentication ? authentication.login.token : null;
    } else {
      token = await firstValueFrom(this.store.select(AuthenticationSelectors.selectToken));
    }
    return `${data}&access_token=${token.token}`;
  }

}
