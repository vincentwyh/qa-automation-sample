import { Page } from "@playwright/test";

/**
 * Base class for all page objects.
 * Provides common properties and functionality shared across page objects.
 *
 * @abstract
 * @class BasePageObject
 */
export abstract class BasePageObject {
  /** Playwright page instance */
  readonly page: Page;

  /**
   * Creates a new BasePageObject instance.
   *
   * @param page - Playwright page instance
   */
  constructor(page: Page) {
    this.page = page;
  }
}
