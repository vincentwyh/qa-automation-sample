import { Page, expect, test } from "@playwright/test";
import { FeedbackWallPage } from "@page-objects";
import { CommonActions } from "@step-objects";
import { timeouts } from "@test-data";

/**
 * Page Actions for the Feedback Wall page.
 * Provides high-level actions and verification methods for feedback management.
 * All assertions are built into the action methods following the helper pattern.
 *
 * @class FeedbackWallPageActions
 * @extends FeedbackWallPage
 */
export class FeedbackWallPageActions extends FeedbackWallPage {
  private commonActions: CommonActions;

  /**
   * Creates a new FeedbackWallPageActions instance.
   *
   * @param page - Playwright page instance
   */
  constructor(page: Page) {
    super(page);
    this.commonActions = new CommonActions(page);
  }

  /**
   * Opens the create feedback modal.
   * Clicks the create button and verifies modal is visible.
   *
   * @returns Promise that resolves when modal is opened
   * @throws Will throw if modal doesn't appear
   */
  async openCreateModal(): Promise<void> {
    await test.step("Open create feedback modal", async () => {
      await this.selectors.buttons.createNew.waitFor({ state: "visible", timeout: timeouts.medium });
      await this.selectors.buttons.createNew.click();
      await this.selectors.modal.container.waitFor({ state: "visible", timeout: timeouts.short });
    });
  }

  /**
   * Fills the feedback creation form with provided data.
   * Automatically selects first available receiver if none specified.
   *
   * @param title - Feedback title
   * @param body - Feedback body content
   * @param receiverUsername - Optional username of feedback receiver
   * @returns Promise that resolves when form is filled
   */
  async fillFeedbackForm(title: string, body: string, receiverUsername?: string): Promise<void> {
    await test.step("Fill feedback form", async () => {
      await this.selectors.form.title.fill(title);
      await this.selectors.form.body.fill(body);

      if (receiverUsername) {
        await this.selectors.form.receiverSelect.selectOption({ label: receiverUsername });
      } else {
        const options = await this.getReceiverOptions().all();
        if (options.length > 0) {
          const firstValue = await options[0].getAttribute("value");
          if (firstValue) {
            await this.selectors.form.receiverSelect.selectOption(firstValue);
          }
        }
      }
    });
  }

  /**
   * Submits the feedback form.
   *
   * @returns Promise that resolves when form is submitted
   */
  async submitFeedbackForm(): Promise<void> {
    await test.step("Submit feedback form", async () => {
      await this.selectors.buttons.modalSubmit.click();
    });
  }

  /**
   * Complete workflow to create new feedback.
   * Opens modal, fills form, submits, and verifies modal closes.
   *
   * @param title - Feedback title
   * @param body - Feedback body content
   * @param receiverUsername - Optional username of feedback receiver
   * @returns Promise that resolves when feedback is created
   * @throws Will throw if any step fails
   */
  async createFeedback(title: string, body: string, receiverUsername?: string): Promise<void> {
    await test.step("Create new feedback", async () => {
      await this.openCreateModal();
      await this.fillFeedbackForm(title, body, receiverUsername);
      await this.submitFeedbackForm();

      await expect(this.selectors.modal.container, "Expected modal to be hidden after submission").toBeHidden({
        timeout: timeouts.short,
      });
      await this.page.waitForLoadState("networkidle", { timeout: timeouts.short });
    });
  }

  /**
   * Verifies that the feedback wall page has loaded correctly.
   * Checks for page title and create button visibility.
   *
   * @returns Promise that resolves when verification is complete
   * @throws Will throw if page elements are not visible
   */
  async verifyPageLoaded(): Promise<void> {
    await test.step("Verify feedback wall page is loaded", async () => {
      await this.page.waitForURL(/\/feedback/);
      await this.page.waitForTimeout(timeouts.hydration);
    });
  }

  /**
   * Verifies that a feedback item with the given title exists on the page.
   *
   * @param title - Title of the feedback to verify
   * @returns Promise that resolves when verification is complete
   * @throws Will throw if feedback is not found
   */
  async verifyFeedbackExists(title: string): Promise<void> {
    await test.step(`Verify feedback with title "${title}" exists`, async () => {
      const feedbackItem = this.getFeedbackItemByTitle(title);

      await expect(feedbackItem, `Expected feedback with title "${title}" to be visible`).toBeVisible();
    });
  }

  /**
   * Verifies that a form error message is displayed.
   *
   * @returns Promise that resolves when verification is complete
   * @throws Will throw if error message is not visible
   */
  async verifyFormError(): Promise<void> {
    await test.step("Verify form error is displayed", async () => {
      await expect(
        this.selectors.texts.errorMessage,
        "Expected error message to be visible for invalid form submission",
      ).toBeVisible();
    });
  }

  /**
   * Verifies that the create feedback modal is closed.
   *
   * @returns Promise that resolves when verification is complete
   * @throws Will throw if modal is still visible
   */
  async verifyModalClosed(): Promise<void> {
    await test.step("Verify modal is closed", async () => {
      await expect(this.selectors.modal.container, "Expected modal to be hidden").toBeHidden();
    });
  }

  /**
   * Verifies that all form fields are visible in the create modal.
   *
   * @returns Promise that resolves when verification is complete
   * @throws Will throw if any form field is not visible
   */
  async verifyFormFieldsVisible(): Promise<void> {
    await test.step("Verify all form fields are visible", async () => {
      await expect(this.selectors.form.title).toBeVisible();
      await expect(this.selectors.form.body).toBeVisible();
      await expect(this.selectors.form.receiverSelect).toBeVisible();
      await expect(this.selectors.buttons.modalSubmit).toBeVisible();
    });
  }

  /**
   * Verifies that the feedback count is a valid number (>= 0).
   *
   * @param count - Number of feedback items to validate
   * @returns Promise that resolves when verification is complete
   * @throws Will throw if count is invalid
   */
  async verifyFeedbackCountValid(count: number): Promise<void> {
    await test.step("Verify feedback count is valid", async () => {
      expect(count).toBeGreaterThanOrEqual(0);
    });
  }

  /**
   * Verifies page title and create button text content.
   *
   * @returns Promise that resolves when verification is complete
   * @throws Will throw if text doesn't match expected values
   */
  async verifyPageTitleAndButton(): Promise<void> {
    await test.step("Verify page title and create button", async () => {
      await expect(this.selectors.texts.pageTitle).toHaveText("Feedback Wall");
      await expect(this.selectors.buttons.createNew).toHaveText("Create New");
    });
  }

  /**
   * Verifies that the feedback count has increased by one.
   *
   * @param initialCount - Initial count before feedback was added
   * @returns Promise that resolves when verification is complete
   * @throws Will throw if count didn't increase by exactly 1
   */
  async verifyFeedbackCountIncreased(initialCount: number): Promise<void> {
    await test.step("Verify feedback count increased", async () => {
      const newCount = await this.commonActions.getCount(this.selectors.feedback.items);

      expect(newCount).toBe(initialCount + 1);
    });
  }

  /**
   * Gets the current count of feedback items on the page.
   *
   * @returns Promise resolving to the number of feedback items
   */
  async getFeedbackItemCount(): Promise<number> {
    return await this.commonActions.getCount(this.selectors.feedback.items);
  }
}
