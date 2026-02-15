/**
 * Generates unique feedback data with a timestamp to ensure uniqueness.
 *
 * @param prefix - Optional prefix for the feedback title (default: 'Test')
 * @returns Object containing unique title and body content
 *
 * @example
 * ```typescript
 * const feedback = generateUniqueFeedback('E2E');
 * // Returns: { title: 'E2E Feedback 1234567890', body: '...' }
 * ```
 */
export function generateUniqueFeedback(prefix = "Test") {
  const timestamp = Date.now();

  return {
    title: `${prefix} Feedback ${timestamp}`,
    body: `This is a test feedback created at ${new Date().toISOString()}`,
  };
}

/**
 * Generates a unique title with a timestamp.
 *
 * @param prefix - Optional prefix for the title (default: 'Test')
 * @returns Unique title string
 *
 * @example
 * ```typescript
 * const title = generateUniqueTitle('API');
 * // Returns: 'API 1234567890'
 * ```
 */
export function generateUniqueTitle(prefix = "Test"): string {
  return `${prefix} ${Date.now()}`;
}
