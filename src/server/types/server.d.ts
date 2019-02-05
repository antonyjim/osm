import * as express from 'express'

export interface ValidationFields {
    isInvalid: boolean;
    fieldName: string;
    fieldValue: string;
}

export interface StatusMessage {
    error: boolean;
    message: string;
    details?: any;
}

export interface QueryResponse {
    error: boolean;
    message: string;
    count?: number;
    results?: any;
}

export interface ResponseMessage {
    error: boolean;
    errorMessage?: string;
    message?: string;
    details?: any;
}

declare global {
    namespace Express {
        interface Request {
            auth?: {
                iA?: boolean,
                iZ?: boolean,
                u?: string,
                c?: string,
                r?: string,
                t?: string
            }
        }
    }
}