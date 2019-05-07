import { browser, by, element } from 'protractor';
import { AppComponent } from 'src/app/app.component';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getNumberPrompt() {
    return element(by.id('number-prompt')).isPresent();
  }

  getGradingView() {
    element(by.id('number-button')).click();
    return element(by.id('grading-view')).isPresent();
  }

  checkGradingView() {
    return element(by.id('grading-view')).isPresent();
  }
}
