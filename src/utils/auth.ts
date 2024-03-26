export function buildBearer(token: string | undefined | null) {
  return token && token.length > 0 ? `Bearer ${token}` : "";
}