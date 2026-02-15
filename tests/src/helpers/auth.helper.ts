import { APIRequestContext, expect } from "@playwright/test";
import { apiEndpoints } from "@test-data";

/**
 * Test user credentials interface.
 */
export interface TestUser {
  username: string;
  password: string;
}

/**
 * Authentication tokens returned from the API.
 */
export interface AuthTokens {
  accessToken: string;
}

/**
 * Authenticates a user and returns the access token.
 *
 * @param request - Playwright API request context
 * @param user - User credentials to authenticate with
 * @returns Promise resolving to the access token
 * @throws Will throw if authentication fails or token is missing
 *
 * @example
 * ```typescript
 * const token = await authenticate(request, testUsers.owner);
 * ```
 */
export async function authenticate(request: APIRequestContext, user: TestUser): Promise<string> {
  const response = await request.post(apiEndpoints.auth.signIn, {
    data: {
      username: user.username,
      password: user.password,
    },
  });

  expect(response.ok()).toBeTruthy();

  const data = await response.json();

  expect(data.accessToken).toBeDefined();

  return data.accessToken;
}

/**
 * Retrieves all users from the API.
 *
 * @param request - Playwright API request context
 * @param token - JWT access token for authentication
 * @returns Promise resolving to the list of users
 * @throws Will throw if request fails
 *
 * @example
 * ```typescript
 * const users = await getAllUsers(request, token);
 * ```
 */
export async function getAllUsers(request: APIRequestContext, token: string) {
  const response = await request.get(apiEndpoints.users.getAll, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  expect(response.ok()).toBeTruthy();
  return response.json();
}

/**
 * Creates new feedback via the API.
 *
 * @param request - Playwright API request context
 * @param token - JWT access token for authentication
 * @param feedbackData - Feedback data including title, body, and receiverId
 * @returns Promise resolving to the API response
 *
 * @example
 * ```typescript
 * const response = await createFeedback(request, token, {
 *   title: 'Great work!',
 *   body: 'Keep it up!',
 *   receiverId: 2
 * });
 * ```
 */
export async function createFeedback(
  request: APIRequestContext,
  token: string,
  feedbackData: { title: string; body: string; receiverId: number },
) {
  const response = await request.post(apiEndpoints.feedback.create, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: feedbackData,
  });

  return response;
}

/**
 * Retrieves all feedback from the API.
 *
 * @param request - Playwright API request context
 * @param token - JWT access token for authentication
 * @returns Promise resolving to the list of feedback items
 * @throws Will throw if request fails
 *
 * @example
 * ```typescript
 * const feedbackList = await getAllFeedback(request, token);
 * ```
 */
export async function getAllFeedback(request: APIRequestContext, token: string) {
  const response = await request.get(apiEndpoints.feedback.getAll, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  expect(response.ok()).toBeTruthy();
  return response.json();
}
