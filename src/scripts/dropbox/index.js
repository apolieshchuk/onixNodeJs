const fetch = require('isomorphic-fetch'); // or another library of choice.
const fs = require('fs');
const { Dropbox } = require('dropbox');
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const ScreenModel = require('./model');

const TOKEN = '59J4-qdIc-sAAAAAAAAwh2tE3w6rmbWWT-0ZkAgGlf4txw8ObQF3i2-JQyjVdIDU';
const FILE_NAME = 'myDB.png';

const dbx = new Dropbox({ accessToken: TOKEN, fetch });

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/users');

  // grab emails
  await page.screenshot({ path: FILE_NAME });

  // write file in google drive
  await dbx.filesUpload({ path: `/${FILE_NAME}`, contents: fs.createReadStream(FILE_NAME) });

  // get shared link
  const sharedData = await dbx.sharingCreateSharedLink({ path: `/${FILE_NAME}` });

  // push emails in mongo db
  await ScreenModel.create({ screenUrl: sharedData.url });
  mongoose.disconnect();

  // close browser
  await browser.close();
})();
