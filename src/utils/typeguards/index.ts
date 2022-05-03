export function hasMessage(error: any | unknown): error is { message: string } {
  // eslint-disable-next-line no-prototype-builtins
  return error.hasOwnProperty("message");
}
