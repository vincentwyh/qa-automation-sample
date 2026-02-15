import { Page, expect, test } from "@playwright/test";
import { SignInPage } from "@page-objects";
import { testUsers } from "@test-data";

type UserKey = keyof typeof testUsers;

/**
 * Page Actions for the Sign In page.
 * Provides high-level actions and verification methods for authentication flows.
 * All assertions are built into the action methods following the helper pattern.
 *
 * @class SignInPageActions
 * @extends SignInPage
 */
export class SignInPageActions extends SignInPage {
  /**
   * Creates a new SignInPageActions instance.
   *
   * @param page - Playwright page instance
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   * Performs login action by filling credentials and clicking sign-in button.
   *
   * @param username - Username to log in with
   * @param password - Password for authentication
   * @returns Promise that resolves when login action is complete
   */
  async login(username: string, password: string): Promise<void> {
    await test.step(`Login as ${username}`, async () => {
      await this.selectors.fields.username.fill(username);
      await this.selectors.fields.password.fill(password);
      await this.selectors.buttons.signIn.click();
    });
  }

  /**
   * Authenticates a user and saves the session state to a file.
   * This allows tests to reuse authentication without logging in each time.
   *
   * @param userKey - The key of the user from testUsers object
   * @returns Promise that resolves when authentication state is saved
   */
  async authenticateAndSaveState(userKey: UserKey): Promise<void> {
    await test.step(`Authenticate as ${userKey} and save session`, async () => {
      const user = testUsers[userKey];

      await this.page.context().clearCookies();
      await this.page.goto("/", { waitUntil: "networkidle" });
      await this.selectors.fields.username.waitFor({ state: "visible" });
      await this.selectors.fields.username.fill(user.username);
      await this.selectors.fields.password.fill(user.password);
      await this.selectors.buttons.signIn.click();
      await this.page.waitForURL(/\/feedback/);

      const storagePath =
        "storagePath" in user ? (user as { storagePath: string }).storagePath : `playwright/.auth/${userKey}.json`;

      await this.page.context().storageState({ path: storagePath });
    });
  }

  /**
   * Verifies that login was successful by checking URL navigation.
   * Expects redirection to the feedback page.
   *
   * @returns Promise that resolves when verification is complete
   * @throws Will throw if URL doesn't match feedback page
   */
  async verifySuccessfulLogin(): Promise<void> {
    await test.step("Verify successful login", async () => {
      await expect(this.page, "Expected to navigate to feedback page after successful login").toHaveURL(/\/feedback/);
    });
  }

  /**
   * Verifies that a login error message is displayed.
   *
   * @returns Promise that resolves when verification is complete
   * @throws Will throw if error message is not visible
   */
  async verifyLoginError(): Promise<void> {
    await test.step("Verify login error is displayed", async () => {
      await expect(
        this.selectors.texts.errorMessage,
        "Expected error message to be visible for failed login",
      ).toBeVisible();
    });
  }

  /**
   * Verifies that the sign-in page has loaded correctly.
   * Checks for page title and sign-in button visibility.
   *
   * @returns Promise that resolves when verification is complete
   * @throws Will throw if page elements are not visible
   */
  async verifyPageLoaded(): Promise<void> {
    await test.step("Verify sign-in page is loaded", async () => {
      await expect(this.selectors.texts.pageTitle, "Expected page title to be visible").toBeVisible();

      await expect(this.selectors.buttons.signIn, "Expected sign-in button to be visible").toBeVisible();
    });
  }

  /**
   * Performs login and verifies success in a single action.
   * Combines login() and verifySuccessfulLogin() for convenience.
   *
   * @param username - Username to log in with
   * @param password - Password for authentication
   * @returns Promise that resolves when login and verification are complete
   * @throws Will throw if login fails or verification fails
   */
  async loginAndVerify(username: string, password: string): Promise<void> {
    await this.login(username, password);
    await this.verifySuccessfulLogin();
  }
}
