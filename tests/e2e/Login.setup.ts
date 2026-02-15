import { test as setup } from "@fixtures";

const usersToAuthenticate = ["owner"] as const;
const allowedUsers = process.env.ONLY_USER?.split(",") ?? usersToAuthenticate;

/**
 * Global test setup for login tests.
 * This file handles authentication setup by logging in and storing authentication state
 * that other tests can use to avoid repeating the login process.
 *
 * Each user gets their own authentication state saved to playwright/.auth/<username>.json
 */
usersToAuthenticate.forEach((userKey) => {
  if (!allowedUsers.includes(userKey)) return;

  setup(`authenticate as ${userKey}`, async ({ signInActions }) => {
    await setup.step("Authenticate and save session", async () => {
      await signInActions.authenticateAndSaveState(userKey);
    });
  });
});
