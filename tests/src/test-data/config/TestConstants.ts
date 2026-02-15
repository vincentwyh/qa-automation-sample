/**
 * Timeout values for test operations (in milliseconds).
 * Centralized timeout constants to avoid magic numbers.
 * @constant
 */
export const timeouts = {
  /** Short timeout for fast UI interactions */
  short: 5000,
  /** Medium timeout for standard element waits */
  medium: 10000,
  /** Very short delay for Vue hydration */
  hydration: 500,
} as const;

/**
 * HTTP status codes used in API tests.
 * @constant
 */
export const httpStatus = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  unprocessableEntity: 422,
} as const;
