/** 1 - Entity Itself **/


import { BaseFailResponse, BaseFindRequest, BaseSuccessResponse } from "../../models/request.model"
import { AnnualInterventionNumberEnum, BillingFrequencyEnum, Contract, RenewalTypeEnum, StatusEnum } from "./contract.model";


/** 2 - DTO **/

export interface ContractCreateRequest {
    customer: number;
    formerContract: number;
    number: string;
    amount: string;
    vatTax: string;
    soldInterventionHours: string;
    interventionDelay: string;
    renewalType: RenewalTypeEnum;
    renewalCount: number;
    startDate: string;
    endDate: string;
    maintenanceTypeCorrective: boolean;
    maintenanceTypePreventive: boolean;
    billingFrequency: BillingFrequencyEnum;
    note: string;
    attachment: any[];
};

export interface ContractCreateSuccessResponse extends BaseSuccessResponse<Contract> {
    data: Contract;
}

export interface ContractCreateFailResponse extends BaseFailResponse {}

export interface ContractUpdateRequest extends ContractCreateRequest {}

export interface ContractUpdateSuccessResponse extends BaseSuccessResponse<Contract> {
    data: Contract;
}

export interface ContractTerminateRequest {
    contract_id: string;
    type: string;
    end_date: string;
}

export interface ContractTerminateSuccessResponse extends BaseSuccessResponse<Contract> {
    data: Contract;
}

export interface ContractUpdateFailResponse extends BaseFailResponse {}

export interface ContractFindRequest extends BaseFindRequest {
    number?: string;
    customer?: string;
    status?: StatusEnum;
    annualInterventionNumber?: AnnualInterventionNumberEnum;
    renewalType?: RenewalTypeEnum;
    content?: string;
    interventionDelay?: number;
    'created[left_date]'?: string;
    'created[right_date]'?: string;
    'startDate[left_date]'?: string;
    'startDate[right_date]'?: string;
    'endDate[left_date]'?: string;
    'endDate[right_date]'?: string;
    postedBy?: number;
}

export interface ContractFindFailResponse extends BaseFailResponse {}

export interface ContractGetRequest {
    id: number
}

export interface ContractGetSuccessResponse extends BaseSuccessResponse<Contract> {
    data: Contract
}

export interface ContractGetFailResponse extends BaseFailResponse {}

/*export interface ContractCountSuccessResponse {
    status: ApiStatusEnum,
    data: {
        new: number,
        planned: number,
        resolved: number,
        cancelled: number,
    }
}

export interface ContractCountFailResponse extends BaseFailResponse {}*/