import { test } from "@fixtures";
import { testUsers, routes } from "@test-data";

const usersWithStorage = ["owner"] as const;
const onlyUsers = process.env.ONLY_USER?.split(",") ?? usersWithStorage;

/**
 * Global test teardown for logout tests.
 * This file serves as the teardown for the Playwright setup project.
 * It verifies that users who were authenticated during setup can navigate properly
 * and performs any cleanup needed.
 */
test.describe("Logout tests for users", () => {
  usersWithStorage.forEach((userKey) => {
    if (!onlyUsers.includes(userKey)) return;

    const user = testUsers[userKey];
    const userStorageData = user as { storagePath: string };

    test.use({ storageState: userStorageData.storagePath });

    test(`${userKey} user session is valid`, async ({ feedbackActions, commonActions }) => {
      await test.step("Navigate to application", async () => {
        await commonActions.navigateTo(routes.feedback);
      });

      await test.step("Verify feedback page loaded correctly", async () => {
        await feedbackActions.verifyPageLoaded();
      });
    });
  });
});
