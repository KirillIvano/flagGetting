const puppeteer = require('puppeteer');
const {
    loginUrl,
    registerUrl,
    password,
} = require('./configs.json');

const {
    loginOrRegisterInputSelector,
    level1RefSelector,
    level2ButtonSelector,
    level3ButtonSelector,
    level4FormSelector
} = require('./selectors');

// логин всегда разный надо , а я лентяй
const login = String(Date.now());

const loginOrRegister = async (page, url) => {
    await page.goto(url);
    await page.waitForSelector(loginOrRegisterInputSelector);

    await page.focus(loginOrRegisterInputSelector);
    await page.keyboard.type(login);
    await page.keyboard.press('Tab');
    await page.keyboard.type(password);
    await page.keyboard.press('Enter');

    await page.waitForNavigation();
};

const doRegister = page => loginOrRegister(page, registerUrl);
const doLogin = page => loginOrRegister(page, loginUrl);

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();

    await doRegister(page);
    await doLogin(page);

    // level 1
    await page.waitForSelector(level1RefSelector);
    await Promise.all([page.click(level1RefSelector), page.waitForNavigation()]);

    // level 2
    await page.waitForSelector(level2ButtonSelector);
    await Promise.all([page.click(level2ButtonSelector), page.waitForNavigation()]);

    // level 3
    await page.waitForSelector(level3ButtonSelector);
    await Promise.all([page.click(level3ButtonSelector), page.waitForNavigation()]);

    // level 4
    const expression = await page.evaluate(() => document.querySelector('label[for="captcha"]').innerText);
    const result = String(eval(expression.slice(0, expression.length - 1)));
    await page.focus(level4FormSelector);
    await page.keyboard.type(result);
    await page.keyboard.press('Enter');

    // infinite wait
    // ЕСЛИ ХОЧЕШЬ ЗАСТОПИТЬ НА КАКОМ - ТО УРОВНЕ ВСТАВЬ ЕНТО
    await new Promise(() => {});
    browser.close();
})();