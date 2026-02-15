import { test } from "@fixtures";
import { testUsers, routes } from "@test-data";

test.use({ storageState: testUsers.owner.storagePath });

test.describe("Feedback Wall Display", () => {
  test.beforeEach(async ({ commonActions, feedbackActions }) => {
    await commonActions.navigateTo(routes.feedback);
    await feedbackActions.verifyPageLoaded();
  });

  test("User can view existing feedback items", async ({ feedbackActions }) => {
    const feedbackCount = await feedbackActions.getFeedbackItemCount();

    await feedbackActions.verifyFeedbackCountValid(feedbackCount);
  });

  test("User can view page title and create button", async ({ feedbackActions }) => {
    await feedbackActions.verifyPageTitleAndButton();
  });
});
