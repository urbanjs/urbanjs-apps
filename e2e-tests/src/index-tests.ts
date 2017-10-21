import * as expect from 'assert';
import { By, ThenableWebDriver } from 'selenium-webdriver';
import { config } from './config';
import { createNewDriver } from './driver';

describe('home screen', () => {
  let driver: ThenableWebDriver;
  before(() => {
    driver = createNewDriver();
  });

  after(async () => {
    await driver.close();
  });

  it('should contain footer', async () => {
    await driver.get(config.serverOrigin);
    const text = await driver.findElement(By.css('body')).getText();

    expect.equal(/Copyright/.test(text), true);
  });
});
