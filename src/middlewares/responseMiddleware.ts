import { NextFunction, Response, Request } from "express";

export interface SuccessResponse<T> {
    success: true;
    message: string;
    data: T;
}

export interface ErrorResponse {
    success: false;
    message: string;
    errors?: any;
}

declare global {
    namespace Express {
        interface Response {
            success<T>(data: T, message?: string, status?: number): void;
            error(message?: string, status?: number, errors?: any): void;
        }
    }
}

const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.success = function <T>(data: T, message = "Operación exitosa", status = 200) {
        const response: SuccessResponse<T> = {
            success: true,
            message,
            data,
        };
        res.status(status).json(response);
    };

    res.error = function (message = "Error en la operación", status = 500, errors = null) {
        const response: ErrorResponse = {
            success: false,
            message,
            errors,
        };
        res.status(status).json(response);
    };

    next();
};

export default responseMiddleware;