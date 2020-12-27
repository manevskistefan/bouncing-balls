import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';
import { Constants } from '../../src/app/app.constants';

/**
 * Integration e2e tests.
 */
describe('workspace-project App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('Should display title with the predefined canvas', async () => {
        browser.waitForAngularEnabled(false);
        await page.navigateTo();

        expect(await page.getTitleText()).toEqual(Constants.APP_NAME);

        let canvas = element(by.css('canvas'));
        expect(canvas).toBeTruthy();
        expect(canvas.getSize()).toEqual(jasmine.objectContaining({width: Constants.Canvas.WIDTH, height: Constants.Canvas.HEIGHT}));
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
        level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
