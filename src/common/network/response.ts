import { ApiError } from "./apiError";

export class BaseResponse<T> {
    data?: T;
    error?: ApiError;

    constructor(data?: T, error?: ApiError) {
        this.data = data;
        this.error = error;
    }

    static success<T>(data: T): BaseResponse<T> {
        return new BaseResponse<T>(data, undefined);
    }

    static failure<T>(error: ApiError): BaseResponse<T> {
        return new BaseResponse<T>(undefined, error);
    }

    get isSuccess(): boolean {
        return this.data !== undefined && this.error === undefined;
    }
}