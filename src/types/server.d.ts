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