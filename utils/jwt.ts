import { SignJWT, jwtVerify, JWTPayload } from "jose";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "dev-secret";
const ACCESS_TOKEN_EXPIRY = (process.env.ACCESS_TOKEN_EXPIRY as any) || "30m"; // change as needed

interface AccessTokenPayload extends JWTPayload {
  id: number;
  email?: string;
}

export async function generateAccessToken(
  payload: AccessTokenPayload,
): Promise<string> {
  const secret = new TextEncoder().encode(ACCESS_TOKEN_SECRET);
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(secret);

  return token;
}

export async function verifyAccessToken(
  token: string,
): Promise<AccessTokenPayload> {
  const secret = new TextEncoder().encode(ACCESS_TOKEN_SECRET);
  const { payload } = await jwtVerify(token, secret);
  return payload as AccessTokenPayload;
}
