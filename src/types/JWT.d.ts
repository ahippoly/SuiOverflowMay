export {};

declare global {
  interface JwtPayload {
    iss?: string;
    sub?: string; //Subject ID
    aud?: string[] | string;
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
  }
}
