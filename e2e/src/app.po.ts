import { browser, by, element, WebElement } from 'protractor';

export class AppPage {
    async navigateTo(): Promise<unknown> {
        return browser.get(browser.baseUrl);
    }

    async getTitleText(): Promise<string> {
        return element(by.css('app-root #container h1')).getText();
    }
}
