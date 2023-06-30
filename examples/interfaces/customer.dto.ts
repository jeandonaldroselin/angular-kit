/** 1 - Entity Itself **/

import { BaseFailResponse, BaseFindRequest, BaseSuccessResponse } from "../../models/request.model"
import { Customer, CustomerTypeEnum } from "./customer.model";


/** 2 - DTO **/

export interface CustomerCreateRequest {
    object: string;
    description: string;
    attachment: any[];
};

export interface CustomerCreateSuccessResponse extends BaseSuccessResponse<Customer> {
    data: Customer;
}

export interface CustomerCreateFailResponse extends BaseFailResponse {}

export interface CustomerUpdateRequest extends CustomerCreateRequest {}

export interface CustomerUpdateSuccessResponse extends BaseSuccessResponse<Customer> {
    data: Customer;
}

export interface CustomerUpdateFailResponse extends BaseFailResponse {}

export interface CustomerCancelRequest {
    id: number
}

export interface CustomerCancelSuccessResponse extends BaseSuccessResponse<Customer> {
    data: Customer;
}

export interface CustomerCancelFailResponse extends BaseFailResponse {}

export interface CustomerFindRequest extends BaseFindRequest {
    id?: string;
    number?: string;
    customerType?: CustomerTypeEnum;
    name?: string;
    note?: string;
    responsibleContent?: string;
    contactContent?: string;
    completeAddressContent?: string;
    billingAddressContent?: string;
    billingContactContent?: string;
    content?: string;
    'created[left_date]'?: number;
    'created[right_date]'?: number;
    postedBy?: number;
}

export interface CustomerFindFailResponse extends BaseFailResponse {}

export interface CustomerGetRequest {
    id: number
}

export interface CustomerGetSuccessResponse extends BaseSuccessResponse<Customer> {
    data: Customer
}

export interface CustomerGetFailResponse extends BaseFailResponse {}

/*export interface CustomerCountSuccessResponse {
    status: ApiStatusEnum,
    data: {
        new: number,
        planned: number,
        resolved: number,
        cancelled: number,
    }
}

export interface CustomerCountFailResponse extends BaseFailResponse {}*/