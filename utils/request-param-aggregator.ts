import {HttpParameterCodec, HttpParams} from '@angular/common/http';
import moment from 'moment';

export type AggregatedParameter = { paramName: string, paramValue: any,  valueSupplier?: () => string };

export class RequestParamAggregator {

  // Tester un init vide.
  private httpParam: HttpParams;
  private encoder: HttpUrlEncodingCodecCustom;

  constructor() {
    this.encoder = new HttpUrlEncodingCodecCustom();
    this.httpParam = new HttpParams({encoder: this.encoder});
  }

  addParam(paramName: string, paramValue, valueSupplier?: (value: any) => string): RequestParamAggregator {
    if (paramValue !== undefined && paramValue !== null && paramValue !== '') {
      this.httpParam = this.httpParam.set(paramName, !!valueSupplier ? valueSupplier(paramValue) : paramValue);
    }
    return this;
  }

  addParams(input: AggregatedParameter|object, options?: { date?: { format?: string } }) {
    const params = typeof input !== 'object' ? input : this.extractParams(input);
    params.forEach((param: { paramName: string, paramValue: any,  valueSupplier?: () => string }) => {
      if(moment.isMoment(param.paramValue)) {
        this.addParam(param.paramName, param.paramValue.format(options?.date?.format ?? "DD/MM/YYYY"), param.valueSupplier)
      } else {
        this.addParam(param.paramName, param.paramValue, param.valueSupplier)
      }
    });
  }

  extractParams(object: object): AggregatedParameter[] {
    return Object.keys(object).map(key => {
        return {
          paramName: key,
          paramValue: object[key],
        }
    });
  }

  getParams() {
    return this.httpParam;
  }
}

class HttpUrlEncodingCodecCustom implements HttpParameterCodec {
  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }

  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }
}
