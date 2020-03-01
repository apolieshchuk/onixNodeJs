const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const { GrabModel } = require('../components/User/model');

/**
 * Grab emails from the page
 *
 * @param <Promise> Promise which resolves to a new Page object.
 * @returns Array with emails
 */
function grabEmails(page) {
  return page.evaluate(() => {
    const data = [];
    const elements = document.querySelectorAll('.email');
    elements.forEach((el) => {
      data.push(el.textContent);
    });
    return data;
  });
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/users');
  await page.screenshot({ path: 'myDB.png' });

  // grab emails
  const emails = await grabEmails(page);

  // push emails in mongo db
  await GrabModel.create({ emails });
  mongoose.disconnect();

  // close browser
  await browser.close();
})();
