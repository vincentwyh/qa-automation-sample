import { APIResponse, expect } from "@playwright/test";
import { httpStatus } from "@test-data";

interface FeedbackItem {
  title: string;
  body?: string;
  receiverId?: number;
  [key: string]: unknown;
}

/**
 * Verifies that an API response was successful.
 *
 * @param response - Playwright API response object
 * @param expectedStatus - Expected HTTP status code (default: httpStatus.ok)
 * @throws Will throw if response is not ok or status doesn't match
 *
 * @example
 * ```typescript
 * await verifySuccessResponse(response, httpStatus.created);
 * ```
 */
export async function verifySuccessResponse(response: APIResponse, expectedStatus = httpStatus.ok) {
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(expectedStatus);
}

/**
 * Verifies that an API response contains an error.
 *
 * @param response - Playwright API response object
 * @param expectedStatus - Expected HTTP error status code
 * @throws Will throw if response is ok or status doesn't match
 *
 * @example
 * ```typescript
 * await verifyErrorResponse(response, httpStatus.unauthorized);
 * ```
 */
export async function verifyErrorResponse(response: APIResponse, expectedStatus: number) {
  expect(response.ok()).toBeFalsy();
  expect(response.status()).toBe(expectedStatus);
}

/**
 * Verifies that feedback was created successfully with correct data.
 *
 * @param response - Playwright API response object
 * @param feedbackData - Expected feedback data (title and body)
 * @throws Will throw if feedback data doesn't match or ID is missing
 *
 * @example
 * ```typescript
 * await verifyFeedbackCreated(response, { title: 'Test', body: 'Content' });
 * ```
 */
export async function verifyFeedbackCreated(response: APIResponse, feedbackData: { title: string; body: string }) {
  const data = await response.json();

  expect(data.title).toBe(feedbackData.title);
  expect(data.body).toBe(feedbackData.body);
  expect(data.id).toBeDefined();
}

/**
 * Verifies that the feedback body matches the expected value.
 *
 * @param response - Playwright API response object
 * @param expectedBody - Expected feedback body content
 * @throws Will throw if body content doesn't match
 *
 * @example
 * ```typescript
 * await verifyFeedbackBody(response, 'This is the content');
 * ```
 */
export async function verifyFeedbackBody(response: APIResponse, expectedBody: string) {
  const data = await response.json();

  expect(data.body).toBe(expectedBody);
}

/**
 * Verifies that the feedback list is a valid array.
 *
 * @param feedbackItems - Array of feedback items to validate
 * @throws Will throw if not an array
 *
 * @example
 * ```typescript
 * verifyFeedbackList(items);
 * ```
 */
export function verifyFeedbackList(feedbackItems: FeedbackItem[]) {
  expect(Array.isArray(feedbackItems)).toBeTruthy();
}

/**
 * Verifies that a specific feedback item exists in the list.
 *
 * @param feedbackItems - Array of feedback items to search
 * @param title - Title of the feedback to find
 * @throws Will throw if feedback with title is not found
 *
 * @example
 * ```typescript
 * verifyFeedbackInList(items, 'Great work!');
 * ```
 */
export function verifyFeedbackInList(feedbackItems: FeedbackItem[], title: string) {
  const foundFeedback = feedbackItems.find((f) => f.title === title);

  expect(foundFeedback).toBeDefined();
  expect(foundFeedback?.title).toBe(title);
}
