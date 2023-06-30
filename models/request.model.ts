// Requests
export interface BaseSuccessResponse<T> extends BaseResponse<T> {
    status: BaseResponseStatusEnum;
    data: T;
}

export enum BaseResponseStatusEnum {
    success = <any>'success',
    error = <any>'error'    
}

export interface BaseResponse<T> {
    status: BaseResponseStatusEnum;
    data: T;
}

export interface BaseFailResponse {
    status: string;
    data: null;
}

export interface BasePaginatedResponse<T> {
    status: BaseResponseStatusEnum;
    data: {
        content: T[],
        pagination: Pagination
    }
}

export interface Pagination {
    total: number;
    page: number;
    current_page_first_index: number;
    current_page_last_index: number;
}

export interface BaseFindRequest {
    content?: string;
    orderBy?: string;
    record_number?: number;
    page: number;
}