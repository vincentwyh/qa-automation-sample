import { Page, Locator } from "@playwright/test";

/**
 * Common reusable actions that can be used across different page objects.
 * Provides basic navigation and element interaction utilities.
 *
 * @class CommonActions
 */
export class CommonActions {
  /** Playwright page instance */
  readonly page: Page;

  /**
   * Creates a new CommonActions instance.
   *
   * @param page - Playwright page instance
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to the specified URL path.
   * The base URL is automatically prepended from Playwright config.
   *
   * @param url - URL to navigate to
   * @returns Promise that resolves when navigation is complete
   *
   * @example
   * ```typescript
   * await commonActions.navigateTo('/feedback');
   * ```
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Checks if an element is visible on the page.
   *
   * @param locator - Playwright locator for the element
   * @returns Promise resolving to true if visible, false otherwise
   *
   * @example
   * ```typescript
   * const visible = await commonActions.isVisible(page.locator('#element'));
   * ```
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Gets the count of elements matching a locator.
   *
   * @param locator - Playwright locator for the elements
   * @returns Promise resolving to the number of matching elements
   *
   * @example
   * ```typescript
   * const count = await commonActions.getCount(page.locator('.feedback-item'));
   * ```
   */
  async getCount(locator: Locator): Promise<number> {
    return await locator.count();
  }
}
