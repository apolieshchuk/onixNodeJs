require('dotenv').config();
const jwt = require('jsonwebtoken');
const request = require('supertest');
const chai = require('chai');
const UserService = require('../../src/components/User/service');

const server = require('../../src/server/server');

const { expect } = chai;

describe('UserComponent -> controller (Requests on proteced routes W/O jwt, csrf-tokens)', () => {
/* Additional function for requests in protected routes without tokens */
  function noTokenCheck(req, done) {
    req.set('Accept', 'application/json')
      .expect('Location', '/auth/login')
      .expect(302, done);
  }
  function noCsrfCheck(req, done) {
    req.set('Accept', 'application/json')
      .expect(403, done);
  }
  /* Test requests  in protected routes without tokens */
  it('UserComponent -> controller -> GET /users (NO jwt-token)', (done) => {
    noTokenCheck(request(server).get('/users'), done);
  });
  it('UserComponent -> controller -> GET /users/:id (NO jwt-token)', (done) => {
    noTokenCheck(request(server).get('/users/someId'), done);
  });
  it('UserComponent -> controller -> POST /users (NO csrf-token)', (done) => {
    noCsrfCheck(request(server).post('/users'), done);
  });
  it('UserComponent -> controller -> POST /update (NO csrf-token)', (done) => {
    noCsrfCheck(request(server).post('/update'), done);
  });
  it('UserComponent -> controller -> POST /delete (NO csrf-token)', (done) => {
    noCsrfCheck(request(server).post('/delete'), done);
  });
});

describe('UserComponent -> controller', () => {
  // create access token
  const testUser = { email: '_TestEmail@test.com', fullName: '_TestUser' };
  const accessToken = jwt.sign({ name: testUser.fullName, email: testUser.email },
    process.env.ACCESS_TOKEN_SECRET);
  let cookie;
  let csrf;

  // extra function for PUT/DELETE methods
  function postData(req, payload, done) {
    req.type('form')
      .set('Cookie', cookie)
      .send(payload)
      .set('Accept', 'application/json')
      .redirects(1)
      .expect(200)
      .expect('Content-Type', /html/)
      .then((res) => {
        UserService.deleteById(payload.id);
        const isError = res.text.indexOf('id="error-box"') !== -1;
        // check error box contain
        expect(isError).to.equal(false);
        done();
      })
      .catch((err) => done(err));
  }

  // extra function for POST/PUT/DELETE methods with incorrect data
  function postInvalidData(req, done) {
    req.type('form')
      .set('Cookie', cookie)
      .send({
        _csrf: csrf,
      })
      .set('Accept', 'application/json')
      .redirects(1)
      .expect(200)
      .expect('Content-Type', /html/)
      .then((res) => {
        const isError = res.text.indexOf('id="error-box"') !== -1;
        // check error box contain
        expect(isError).to.equal(true);
        done();
      })
      .catch((err) => done(err));
  }

  // first request for get csrf
  before((done) => {
    request(server)
      .get('/users')
      .set('Cookie', [`accessToken= ${accessToken} `]) // users protected route
      .then((res1) => {
        const regex = /name="_csrf" value="([^"]*)/g;
        csrf = regex.exec(res1.text)[1];
        cookie = res1.headers['set-cookie'];
        cookie.push(`accessToken= ${accessToken} `);
        done();
      });
  });

  /* Test route /users */
  it('UserComponent -> controller -> GET /users ', (done) => {
    request(server)
      .get('/users')
      .set('Accept', 'application/json')
      .set('Cookie', [`accessToken= ${accessToken} `]) // users protected route
      .expect('Content-Type', /html/)
      .expect(200)
      .then((res) => {
        expect(res.text).to.include(`Login as: <span>${testUser.fullName}</span>`);
        done();
      })
      .catch((err) => done(err));
  });

  /* Test find user by id */
  it('UserComponent -> controller -> GET /users/:id', async () => {
    // create new user for test
    const { id } = await UserService.create(testUser);
    try {
      const { body } = await request(server)
        .get(`/users/${id}`)
        .set('Accept', 'application/json')
        .set('Cookie', [`accessToken= ${accessToken} `]) // users protected route
        .expect('Content-Type', /json/)
        .expect(200);
      expect(body);
      expect(body).to.have.property('data').and.to.be.an('object');
      expect(body.data).to.have.all.keys('_id', 'fullName', 'email');
    } finally {
      UserService.deleteById(id);
    }
  });

  /* Test find user by id (wrong ID format) */
  it('UserComponent -> controller -> GET /users/:id (wrong ID format)', (done) => {
    request(server)
      .get('/users/someWrongId')
      .set('Accept', 'application/json')
      .set('Cookie', [`accessToken= ${accessToken} `]) // users protected route
      .expect('Content-Type', /json/)
      .expect('set-cookie', /_csrf/)
      .expect(422)
      .then(({ body }) => {
        expect(body);
        expect(body).to.have.all.keys('error', 'details');
        done();
      })
      .catch((err) => done(err));
  });

  /* Test find user by id (wrong ID) */
  it('UserComponent -> controller -> GET /users/:id (wrong ID)', (done) => {
    request(server)
      .get('/users/999999999999999559999999')
      .set('Accept', 'application/json')
      .set('Cookie', [`accessToken= ${accessToken} `]) // users protected route
      .expect('Content-Type', /html/)
      .expect(404)
      .then((res) => {
        expect(res.text).to.include('User not found');
        done();
      })
      .catch((err) => done(err));
  });

  /* Test create user route */
  it('UserComponent -> controller -> POST /users', (done) => {
    request(server)
      .post('/users')
      .type('form')
      .set('Cookie', cookie)
      .send({
        email: testUser.email,
        fullName: testUser.fullName,
        _csrf: csrf,
      })
      .set('Accept', 'application/json')
      .expect(302)
      .then((res) => {
        UserService.deleteById(res.header.userid);
        done();
      })
      .catch((err) => done(err));
  });

  /* Test create user route (Invalid data) */
  it('UserComponent -> controller -> POST /users (invalid data)', (done) => {
    postInvalidData(request(server).post('/users'), done);
  });

  /* Test update user route */
  it('UserComponent -> controller -> PUT /users', (done) => {
    UserService.create(testUser)
      .then(({ id }) => {
        const payload = {
          id,
          email: testUser.email,
          fullName: 'updated',
          _csrf: csrf,
        };
        postData(request(server).put('/users'), payload, done);
      });
  });

  /* Test update user route (Invalid data) */
  it('UserComponent -> controller -> PUT /users (Invalid data)', (done) => {
    postInvalidData(request(server).put('/users'), done);
  });

  /* Test delete user route */
  it('UserComponent -> controller -> DELETE /users', (done) => {
    UserService.create(testUser)
      .then(({ id }) => {
        const payload = {
          id,
          _csrf: csrf,
        };
        postData(request(server).delete('/users'), payload, done);
      });
  });

  /* Test delete user route (Invalid data) */
  it('UserComponent -> controller -> DELETE /users (Invalid data)', (done) => {
    postInvalidData(request(server).delete('/users'), done);
  });
});
