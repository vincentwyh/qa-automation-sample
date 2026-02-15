import {Page, Locator} from '@playwright/test';
import {BasePageObject} from './BasePageObject';

/**
 * Page Object for the Sign In page.
 * Contains all locators and selectors for authentication-related elements.
 * 
 * @class SignInPage
 * @extends BasePageObject
 */
export class SignInPage extends BasePageObject {
    /** All selectors organized by category */
    readonly selectors: {
        fields: {
            username: Locator;
            password: Locator;
        };
        buttons: {
            signIn: Locator;
        };
        texts: {
            errorMessage: Locator;
            pageTitle: Locator;
        };
    };

    /**
     * Creates a new SignInPage instance.
     * Initializes all page selectors.
     * 
     * @param page - Playwright page instance
     */
    constructor(page: Page) {
        super(page);
        this.selectors = {
            fields: {
                username: this.page.getByTestId('login').locator('#username'),
                password: this.page.getByTestId('login').locator('#password'),
            },
            buttons: {
                signIn: this.page.getByTestId('login').getByRole('button'),
            },
            texts: {
                errorMessage: this.page.locator('.text-red-400'),
                pageTitle: this.page.getByTestId('login').getByRole('heading', {level: 2}),
            },
        };
    }
}
