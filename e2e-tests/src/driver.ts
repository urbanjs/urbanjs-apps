import { Builder, ThenableWebDriver } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

export function createNewDriver(): ThenableWebDriver {
  const options = new chrome.Options();
  options.headless();
  options.addArguments('no-sandbox');

  return new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
}
