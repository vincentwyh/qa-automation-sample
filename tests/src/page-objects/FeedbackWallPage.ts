import { Page, Locator } from "@playwright/test";
import { BasePageObject } from "./BasePageObject";

/**
 * Page Object for the Feedback Wall page.
 * Contains all locators and selectors for feedback-related elements.
 *
 * @class FeedbackWallPage
 * @extends BasePageObject
 */
export class FeedbackWallPage extends BasePageObject {
  /** All selectors organized by category */
  readonly selectors: {
    buttons: {
      createNew: Locator;
      fullscreen: Locator;
      modalSubmit: Locator;
    };
    modal: {
      container: Locator;
      title: Locator;
      description: Locator;
    };
    form: {
      title: Locator;
      body: Locator;
      receiverSelect: Locator;
    };
    feedback: {
      container: Locator;
      items: Locator;
      loadingIndicator: Locator;
      emptyMessage: Locator;
    };
    texts: {
      pageTitle: Locator;
      errorMessage: Locator;
    };
  };

  /**
   * Creates a new FeedbackWallPage instance.
   * Initializes all page selectors.
   *
   * @param page - Playwright page instance
   */
  constructor(page: Page) {
    super(page);
    this.selectors = {
      buttons: {
        createNew: this.page.getByRole("button", { name: "Create New" }),
        fullscreen: this.page.getByRole("link", { name: "Toggle Fullscreen" }),
        modalSubmit: this.page.getByRole("button", { name: "Submit" }).first(),
      },
      modal: {
        container: this.page.getByRole("dialog"),
        title: this.page.getByRole("dialog").getByRole("heading", { name: "Create Feedback" }),
        description: this.page.getByRole("dialog").getByText("Give your peers some feedback"),
      },
      form: {
        title: this.page.getByRole("textbox", { name: "Title" }),
        body: this.page.getByRole("textbox", { name: "Comment" }),
        receiverSelect: this.page.getByRole("combobox").first(),
      },
      feedback: {
        container: this.page.getByTestId("feedback-wall-page"),
        items: this.page.locator("h3.font-bold"),
        loadingIndicator: this.page.getByText("Loading"),
        emptyMessage: this.page.getByText("Be the first to give feedback!"),
      },
      texts: {
        pageTitle: this.page.getByRole("heading", { name: "Feedback Wall" }),
        errorMessage: this.page.locator(".text-red-400"),
      },
    };
  }

  /**
   * Gets all available receiver options from the dropdown.
   * Excludes disabled options.
   *
   * @returns Locator for receiver option elements
   */
  getReceiverOptions() {
    return this.selectors.form.receiverSelect.locator("option:not([disabled])");
  }

  /**
   * Gets a feedback item by its title text.
   *
   * @param title - The title text to search for
   * @returns Locator for the feedback item
   */
  getFeedbackItemByTitle(title: string) {
    return this.page.locator(`:text("${title}")`).first();
  }
}
