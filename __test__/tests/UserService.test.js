const chai = require('chai');
require('dotenv').config();
const UserService = require('../../src/components/User/service');
const UserModel = require('../../src/components/User/model');

const { expect } = chai;

// create test objects
const testObjects = [];
for (let i = 0; i < process.env.TEST_OBJECTS_AMOUNT; i += 1) {
  testObjects.push({
    fullName: `_testName${i}`,
    email: `_test${i}@test.com`,
  });
}

// create tmp list for tmp test-objects id from mongo DB
let testIds = [];

// randomGenerator
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

describe('UserComponent -> service', () => {
  /* @beforeEach and @afterEach functions */
  beforeEach(async () => {
    const objList = await UserModel.insertMany(testObjects);
    objList.forEach((obj) => { testIds.push(obj.id); });
  });
  afterEach(async () => {
    await UserModel.deleteMany({ _id: { $in: testIds } });
    testIds = [];
  });

  /* Just compare direct query in db with service.findAll()
  * (I dunno how do its check more complex if db already have elements) */
  it('UserComponent -> service -> findAll', async () => {
    expect(await UserModel.find({}))
      .to.eql(await UserService.findAll());
  });

  /* Test find by id results */
  it('UserComponent -> service -> findById', async () => {
    // create results arrays
    let results = [];
    const expectResults = [];

    // generate random id's and add results into my and expected arrays
    for (let i = 0; i < process.env.TEST_OBJECTS_AMOUNT; i += 1) {
      const randomIndex = getRandomInt(process.env.TEST_OBJECTS_AMOUNT);
      results.push(UserService.findById(testIds[randomIndex]));
      expectResults.push(testObjects[randomIndex]);
    }

    // wait all promises complete
    results = await Promise.all(results);

    // compare results
    for (let i = 0; i < process.env.TEST_OBJECTS_AMOUNT; i += 1) {
      expect(expectResults[i].fullName).to.equal(results[i].fullName);
      expect(expectResults[i].email).to.equal(results[i].email);
    }
  });

  /* Test create user service */
  it('UserComponent -> service -> create', async () => {
    // create object (with num more then created in @beforeEach)
    const newObject = {
      fullName: `_testName${process.env.TEST_OBJECTS_AMOUNT}`,
      email: `_test${process.env.TEST_OBJECTS_AMOUNT}@test.com`,
    };
    const createdObject = await UserService.create(newObject);
    await UserModel.deleteOne(newObject);
    expect(newObject).to.eql({
      fullName: createdObject.fullName,
      email: createdObject.email,
    });
  });

  /* Test create user service (NO DUPLICATES) */
  it('UserComponent -> service -> create (NO DUPLICATES)', async () => {
    // create object (with num more then created in @beforeEach)
    const newObject = {
      fullName: `_testName${process.env.TEST_OBJECTS_AMOUNT}`,
      email: `_test${process.env.TEST_OBJECTS_AMOUNT}@test.com`,
    };
    await UserService.create(newObject);
    try {
      await UserService.create(newObject);
      expect.fail('Must throw duplicate exception');
    } catch (err) {
      expect('MongoError').to.equal(err.name);
      expect(Number(11000)).to.equal(err.code);
    }
    await UserModel.deleteOne(newObject);
  });

  /* Test update user service */
  it('UserComponent -> service -> update', async () => {
    // create results arrays
    let results = [];
    const expectResults = [];
    // generate random id's and add results into my and expected arrays
    for (let i = 0; i < process.env.TEST_OBJECTS_AMOUNT; i += 1) {
      const randomIndex = getRandomInt(process.env.TEST_OBJECTS_AMOUNT);
      const updObject = {
        fullName: `${testObjects[randomIndex].fullName}_upd`,
        email: `${testObjects[randomIndex].email}_upd`,
      };
      results.push(UserService.updateById(testIds[randomIndex], updObject));
      expectResults.push(updObject);
    }

    // wait all promises complete
    results = await Promise.all(results);

    // compare results
    for (let i = 0; i < process.env.TEST_OBJECTS_AMOUNT; i += 1) {
      expect(expectResults[i].fullName).to.equal(results[i].fullName);
      expect(expectResults[i].email).to.equal(results[i].email);
    }
  });

  /* Test delete user service */
  it('UserComponent -> service -> delete', async () => {
    // create results arrays
    let results = [];
    // generate random id's and add results into my and expected arrays
    for (let i = 0; i < process.env.TEST_OBJECTS_AMOUNT; i += 1) {
      results.push(UserService.deleteById(testIds[i]));
    }

    // wait all promises complete
    results = await Promise.all(results);

    // compare results
    results.map((el) => expect(el.deletedCount).to.equal(1));
  });
});
