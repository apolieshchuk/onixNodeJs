const chai = require('chai');
const path = require('path');

// expect path
chai.use(require('chai-fs'));

const { expect } = chai;

describe('EXIST FILES', () => {
  it('ESLinter', (done) => {
    expect(path.join(__dirname, '../../.eslintrc.js')).to.be.a.path();
    done();
  });
  it('Gitignore', (done) => {
    expect(path.join(__dirname, '../../.gitignore')).to.be.a.path();
    done();
  });
});
