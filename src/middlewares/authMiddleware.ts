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

export const checkScopes = requiredScopes(SCOPES);