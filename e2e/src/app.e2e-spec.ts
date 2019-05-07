import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display number prompt by default', () => {
    page.navigateTo();
    expect(page.getNumberPrompt()).toBeTruthy();
  });

  it('should switch display to grade view', () => {
    page.navigateTo();
    expect(page.getGradingView()).toBeTruthy();
  });

  it('should not display grade view by default', () => {
    page.navigateTo();
    expect(page.checkGradingView()).toBeFalsy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
