export type AuthErrorCode = 'invalid_credential' | 'expired_credential' | 'unavailable';

export class AuthError extends Error {
  override readonly name = 'AuthError';
  readonly code: AuthErrorCode;
  override readonly cause?: unknown;

  constructor(code: AuthErrorCode, message: string, options: { cause?: unknown } = {}) {
    super(message);
    this.code = code;
    this.cause = options.cause;
  }
}

export function isAuthError(error: unknown): error is AuthError {
  return error instanceof AuthError;
}
