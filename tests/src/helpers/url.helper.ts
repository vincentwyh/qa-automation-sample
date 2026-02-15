/**
 * Constructs a full URL by combining the base URL with a path.
 *
 * @param path - URL path to append to base URL
 * @returns Full URL string
 *
 * @example
 * ```typescript
 * const url = getFullUrl('/feedback');
 * // Returns: 'http://localhost:3000/feedback'
 * ```
 */
export function getFullUrl(path: string): string {
  const baseUrl = "http://localhost:3000";

  return `${baseUrl}${path}`;
}

/**
 * Returns the base URL for API requests.
 *
 * @returns API base URL string
 *
 * @example
 * ```typescript
 * const apiBase = getApiBaseUrl();
 * // Returns: 'http://localhost:3022'
 * ```
 */
export function getApiBaseUrl(): string {
  return "http://localhost:3022";
}
