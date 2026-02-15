import { test } from "@fixtures";
import { testUsers, routes } from "@test-data";

test.describe("User Authentication", () => {
  test("User can successfully login and navigate to feedback wall", async ({
    commonActions,
    signInActions,
    feedbackActions,
  }) => {
    await commonActions.navigateTo(routes.signIn);
    await signInActions.verifyPageLoaded();
    await signInActions.loginAndVerify(testUsers.owner.username, testUsers.owner.password);
    await feedbackActions.verifyPageLoaded();
  });

  test("User cannot login with invalid credentials", async ({ commonActions, signInActions }) => {
    await commonActions.navigateTo(routes.signIn);
    await signInActions.verifyPageLoaded();
    await signInActions.login("invaliduser", "wrongpassword");
    await signInActions.verifyLoginError();
  });
});
