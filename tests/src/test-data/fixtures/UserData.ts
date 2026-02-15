/**
 * Base path for storing authentication session states.
 * @constant
 */
const baseAuthPath = "playwright/.auth/";

/**
 * Pre-defined test users with credentials for authentication testing.
 * These users are seeded in the database during setup.
 * Each user includes a storagePath for session persistence.
 * @constant
 */
export const testUsers = {
  owner: {
    username: "owner",
    password: "!password123",
    storagePath: `${baseAuthPath}owner.json`,
  },
  jane: {
    username: "jane",
    password: "!password123",
    storagePath: `${baseAuthPath}jane.json`,
  },
  john: {
    username: "john",
    password: "!password123",
    storagePath: `${baseAuthPath}john.json`,
  },
  tim: {
    username: "tim",
    password: "!password123",
    storagePath: `${baseAuthPath}tim.json`,
  },
  lea: {
    username: "lea",
    password: "!password123",
    storagePath: `${baseAuthPath}lea.json`,
  },
} as const;

/**
 * List of available feedback receivers (usernames only).
 * Used for selecting feedback recipients in forms and API requests.
 * @constant
 */
export const feedbackReceivers = {
  jane: "jane",
  john: "john",
  tim: "tim",
  lea: "lea",
} as const;
