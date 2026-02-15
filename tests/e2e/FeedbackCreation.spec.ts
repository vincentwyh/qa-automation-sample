import { test } from "@fixtures";
import {
  testUsers,
  feedbackReceivers,
  positiveFeedback,
  constructiveFeedback,
  multipleFeedbackItems,
  routes,
} from "@test-data";

test.use({ storageState: testUsers.owner.storagePath });

test.describe("Feedback Creation", () => {
  test.beforeEach(async ({ commonActions, feedbackActions }) => {
    await commonActions.navigateTo(routes.feedback);
    await feedbackActions.verifyPageLoaded();
  });

  test("User can create new feedback", async ({ feedbackActions }) => {
    await feedbackActions.createFeedback(positiveFeedback.title, positiveFeedback.body, feedbackReceivers.jane);
    await feedbackActions.verifyFeedbackExists(positiveFeedback.title);
  });

  test("User can create multiple feedback items", async ({ feedbackActions }) => {
    for (const feedback of multipleFeedbackItems) {
      await feedbackActions.createFeedback(feedback.title, feedback.body, feedback.receiver);
      await feedbackActions.verifyFeedbackExists(feedback.title);
    }
  });

  test("User can complete full feedback creation journey", async ({ feedbackActions }) => {
    const initialCount = await feedbackActions.getFeedbackItemCount();
    const uniqueTitle = `Test Feedback ${Date.now()}`;

    await feedbackActions.createFeedback(uniqueTitle, constructiveFeedback.body, feedbackReceivers.jane);
    await feedbackActions.verifyFeedbackExists(uniqueTitle);
    await feedbackActions.verifyFeedbackCountIncreased(initialCount);
  });
});
