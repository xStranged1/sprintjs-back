import { NextFunction, Request, Response } from "express";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";

const {
    AUDIENCE = '',
    ISSUER_BASE_URL = '',
    SCOPES = ''
} = process.env

export const checkJwt = auth({
    audience: AUDIENCE,
    issuerBaseURL: ISSUER_BASE_URL,
});

export const checkSub = (req: Request, res: Response, next: NextFunction) => {
    const sub = req.auth?.payload.sub;
    if (!sub) {
        return res.error('Unauthorized Access', 401);
    }
    req.sub = sub;
    next();
};
export const checkScopes = requiredScopes(SCOPES);