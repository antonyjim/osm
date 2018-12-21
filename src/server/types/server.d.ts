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

export interface ResponseMessage {
    error: boolean;
    errorMessage?: string;
    message?: string;
    payload?: any;
}

export interface Response extends express.Response {
    body?: ResponseMessage    
}

declare global {
    namespace Express {
        interface Request {
            auth?: {
                isAuthenticated?: boolean,
                isAuthorized?: boolean,
                userId?: string,
                role?: string
            }
        }
    }
}