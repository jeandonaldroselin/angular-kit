import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasePaginatedResponse } from '../models/request.model';
import { USE_MOCKS } from '../tokens/tokens';
import { RequestParamAggregator } from '../utils/request-param-aggregator';
import { environment } from '../environments/environment';
import { ContractCreateRequest, ContractCreateSuccessResponse, ContractCreateFailResponse, ContractUpdateRequest, ContractUpdateSuccessResponse, ContractUpdateFailResponse, ContractFindRequest, ContractGetRequest, ContractGetSuccessResponse, ContractGetFailResponse } from './interfaces/contract.dto';
import { Contract } from './interfaces/contract.model';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private HttpClient: HttpClient,
              @Inject(USE_MOCKS) private useMocks: boolean) { }

  create(request: ContractCreateRequest): Observable<ContractCreateSuccessResponse|ContractCreateFailResponse> {
    const url = `${environment.apiBaseUrl}/api/contract/create`;
    return this.HttpClient.post<ContractCreateSuccessResponse|ContractCreateFailResponse>(url, request, { observe: 'body' });
  }

  update(request: ContractUpdateRequest): Observable<ContractUpdateSuccessResponse|ContractUpdateFailResponse> {
    const url = `${environment.apiBaseUrl}/api/contract/update`;
    return this.HttpClient.post<ContractUpdateSuccessResponse|ContractUpdateFailResponse>(url, request, { observe: 'body' });
  }

  find(request: Partial<ContractFindRequest>): Observable<BasePaginatedResponse<Contract>/*|ContractFindFailResponse*/> {    
    const aggregator = new RequestParamAggregator();
    aggregator.addParams(request);
    const params = aggregator.getParams();
    const url = this.useMocks ? '/assets/api-mocks/ContractFind.json' : `${environment.apiBaseUrl}/api/contract/find`;
    return this.HttpClient.get<BasePaginatedResponse<Contract>/*|ContractFindFailResponse*/>(url, { params });
  }

  get(request: ContractGetRequest): Observable<ContractGetSuccessResponse|ContractGetFailResponse> {
    const aggregator = new RequestParamAggregator();
    aggregator.addParams(request);
    const params = aggregator.getParams();
    const url = this.useMocks ? '/assets/api-mocks/ContractGet.json' : `${environment.apiBaseUrl}/api/contract/get`;
    return this.HttpClient.get<ContractGetSuccessResponse|ContractGetFailResponse>(url, { params });
  }

  /*count(request: any): Observable<ContractCountSuccessResponse|ContractCountFailResponse> {
    const aggregator = new RequestParamAggregator();
    aggregator.addParams(request);
    const params = aggregator.getParams();
    const url = this.useMocks ? '/assets/api-mocks/ContractCount.json' : `${environment.apiBaseUrl}/api/contract/count`;
    return this.HttpClient.get<ContractCountSuccessResponse|ContractCountFailResponse>(url, { params });
  }*/

}
