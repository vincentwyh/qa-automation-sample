import { test as baseTest } from "@playwright/test";
import { SignInPageActions } from "@page-actions";
import { FeedbackWallPageActions } from "@page-actions";
import { CommonActions } from "@step-objects";

type TestFixtures = {
  signInActions: SignInPageActions;
  feedbackActions: FeedbackWallPageActions;
  commonActions: CommonActions;
};

export const test = baseTest.extend<TestFixtures>({
  signInActions: async ({ page }, use) => {
    const signInActions = new SignInPageActions(page);
    await use(signInActions);
  },
  feedbackActions: async ({ page }, use) => {
    const feedbackActions = new FeedbackWallPageActions(page);
    await use(feedbackActions);
  },
  commonActions: async ({ page }, use) => {
    const commonActions = new CommonActions(page);
    await use(commonActions);
  },
});

export { expect } from "@playwright/test";
