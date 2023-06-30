import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../environments/environment';
import { ContractService } from './contract.service';
import { BasePaginatedResponse, BaseResponseStatusEnum } from '../models/request.model';
import { ContractCreateRequest, ContractCreateSuccessResponse, ContractUpdateRequest, ContractUpdateSuccessResponse, ContractTerminateRequest, ContractTerminateSuccessResponse, ContractFindRequest, ContractGetRequest, ContractGetSuccessResponse } from './interfaces/contract.dto';
import { Contract } from './interfaces/contract.model';


describe('ContractService', () => {
  let service: ContractService;
  let httpTestingController: HttpTestingController;
  const ContractResult: Contract = {
  } as Contract;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(ContractService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call create function from ContractService', () => {
    const url = `${environment.apiBaseUrl}/api/contract/create`;
    const request: ContractCreateRequest = {} as ContractCreateRequest;
    const response: ContractCreateSuccessResponse = {
      status: BaseResponseStatusEnum.success,
      data: ContractResult
    };
    service.create(request).subscribe((body) => {
      expect(body).toEqual(response);
    })
    const requestExecution = httpTestingController.expectOne({ method: 'post', url });
    requestExecution.flush(response);
  });

  it('should call update function from ContractService', () => {
    const url = `${environment.apiBaseUrl}/api/contract/update`;
    const request: ContractUpdateRequest = {} as ContractCreateRequest;
    const response: ContractUpdateSuccessResponse = {
      status: BaseResponseStatusEnum.success,
      data: ContractResult
    };
    service.update(request).subscribe((body) => {
      expect(body).toEqual(response);
    })
    const requestExecution = httpTestingController.expectOne({ method: 'post', url });
    requestExecution.flush(response);
  });

  it('should call terminate function from ContractService', () => {
    const url = `${environment.apiBaseUrl}/api/contract/cancel`;
    const request: ContractTerminateRequest = {
      id: 123
    };
    const response: ContractTerminateSuccessResponse = {
      status: BaseResponseStatusEnum.success,
      data: ContractResult
    };
    service.terminate(request).subscribe((body) => {
      expect(body).toEqual(response);
    })
    const requestExecution = httpTestingController.expectOne({ method: 'post', url });
    requestExecution.flush(response);
  });

  it('should call find function from ContractService', () => {
    const url = `${environment.apiBaseUrl}/api/contract/find?record_number=20&page=1`;
    const request: ContractFindRequest = {
      record_number: 20,
      page: 1
    };
    const response: BasePaginatedResponse<Contract> = {
        status: BaseResponseStatusEnum.success,
        data: {
          content: [ContractResult],
          pagination: {
            page: 1,
            total: 20,
            current_page_first_index: 0,
            current_page_last_index: 9
          },
        }
    };
    service.find(request).subscribe((body) => {
      expect(body).toEqual(response);
    })
    const requestExecution = httpTestingController.expectOne({ method: 'get', url });
    requestExecution.flush(response);
  });

  it('should call get function from ContractService', () => {
    const url = `${environment.apiBaseUrl}/api/contract/get?id=${123}`;
    const request: ContractGetRequest = {
      id: 123
    };
    const response: ContractGetSuccessResponse = {
        status: BaseResponseStatusEnum.success,
        data: ContractResult
    };
    service.get(request).subscribe((body) => {
      expect(body).toEqual(response);
    })
    const requestExecution = httpTestingController.expectOne({ method: 'get', url });
    requestExecution.flush(response);
  });

  /*it('should call count function from ContractService', () => {
    const url = `${environment.apiBaseUrl}/api/contract/count`;

    const response: ContractCountSuccessResponse = {
        status: BaseResponseStatusEnum.success,
        data: {
          new: 0,
          planned: 1,
          resolved: 2,
          cancelled: 3,
        }
    };
    service.count().subscribe((body) => {
      expect(body).toEqual(response);
    })
    const requestExecution = httpTestingController.expectOne({ method: 'get', url });
    requestExecution.flush(response);
  });*/

});
