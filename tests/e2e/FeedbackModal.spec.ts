import { test } from "@fixtures";
import { testUsers, routes } from "@test-data";

test.use({ storageState: testUsers.owner.storagePath });

test.describe("Feedback Modal Behavior", () => {
  test.beforeEach(async ({ commonActions, feedbackActions }) => {
    await commonActions.navigateTo(routes.feedback);
    await feedbackActions.verifyPageLoaded();
  });

  test("User can open and close create feedback modal", async ({ page, feedbackActions }) => {
    await feedbackActions.openCreateModal();
    await page.keyboard.press("Escape");
    await feedbackActions.verifyModalClosed();
  });

  test("User can view all required form fields in create modal", async ({ feedbackActions }) => {
    await feedbackActions.openCreateModal();
    await feedbackActions.verifyFormFieldsVisible();
  });
});
