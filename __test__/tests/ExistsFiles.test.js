/* eslint-disable no-undef */
const chai = require('chai');
const path = require('path');

// expect path
chai.use(require('chai-fs'));

const { expect } = chai;

describe('EXIST FILES', () => {
  it('ESLinter config', (done) => {
    expect(path.join(__dirname, '../../.eslintrc.js')).to.be.a.path();
    done();
  });
  it('Gitignore config', (done) => {
    expect(path.join(__dirname, '../../.gitignore')).to.be.a.path();
    done();
  });
  it('Husky config', (done) => {
    expect(path.join(__dirname, '../../.huskyrc')).to.be.a.path();
    done();
  });
  it('Package.json', (done) => {
    expect(path.join(__dirname, '../../package.json')).to.be.a.path();
    done();
  });
  it('ENV config', (done) => {
    expect(path.join(__dirname, '../../.env')).to.be.a.path();
    done();
  });
  it('NOdemon config', (done) => {
    expect(path.join(__dirname, '../../nodemon.json')).to.be.a.path();
    done();
  });
});
