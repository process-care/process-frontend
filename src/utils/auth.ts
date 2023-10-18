export function buildBearer(jwt: string | undefined | null) {
  return jwt && jwt.length > 0 ? `Bearer ${jwt}` : "";
}