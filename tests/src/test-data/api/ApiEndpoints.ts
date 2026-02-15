/**
 * Base URL for the API server.
 * @constant
 */
const API_BASE = "http://localhost:3022";

/**
 * Centralized API endpoint definitions for testing.
 * Provides consistent endpoint URLs across all API tests.
 * @constant
 */
export const apiEndpoints = {
  /** Authentication-related endpoints */
  auth: {
    /** Sign-in endpoint for user authentication */
    signIn: `${API_BASE}/auth/sign-in`,
  },
  /** Feedback-related endpoints */
  feedback: {
    /** Base feedback endpoint */
    base: `${API_BASE}/feedback`,
    /** Create new feedback endpoint */
    create: `${API_BASE}/feedback`,
    /** Get all feedback endpoint */
    getAll: `${API_BASE}/feedback`,
  },
  /** User-related endpoints */
  users: {
    /** Get all users endpoint */
    getAll: `${API_BASE}/auth/users`,
  },
};
