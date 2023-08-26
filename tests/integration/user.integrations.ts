import { expect } from 'chai';
import request from 'supertest';

import app from '../../app/server';

const user = {
  first_name: 'Ugo',
  last_name: 'Ejiogu',
  email: 'test@test.com',
  password: 'password',
};

describe('User', () => {
  describe('Create User', () => {
    it('should create user successfully', (done) => {
      request(app)
        .post('/api/v1/users')
        .set('Accept', 'application/json')
        .send(user)
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(201);
          expect(res.body.code).to.be.equal(201);
          expect(res.body.message).to.be.equal('User created successfully');
          expect(res.body.data.first_name).to.be.equal(user.first_name);
          expect(res.body.data.last_name).to.be.equal(user.last_name);
          expect(res.body.data.email).to.be.equal(user.email);
          done();
        });
    });

    it('should throw error for missing field', (done) => {
      request(app)
        .post('/api/v1/users')
        .set('Accept', 'application/json')
        .send({
          first_name: 'Ugo',
          last_name: 'Ejiogu',
          email: 'test@test.com',
        })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          expect(res.body.message).to.be.equal('password is required');
          done();
        });
    });

    it('should throw error if user already exists', (done) => {
      request(app)
        .post('/api/v1/users')
        .set('Accept', 'application/json')
        .send(user)
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          expect(res.body.message).to.be.equal('User already exists');
          done();
        });
    });
  });

  describe('Login User', () => {
    it('should login user successfully', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .set('Accept', 'application/json')
        .send({ email: user.email, password: user.password })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.code).to.be.equal(200);
          expect(res.body.message).to.be.equal('Login successful');
          process.env.USER_TOKEN = res.body.data.token;
          done();
        });
    });

    it('should not login user with invalid email', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .set('Accept', 'application/json')
        .send({ email: 'invalid@email.com', password: user.password })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          expect(res.body.message).to.be.equal('Invalid credentials');
          done();
        });
    });

    it('should not login user with wrong password', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .set('Accept', 'application/json')
        .send({ email: user.email, password: 'wrongPassword' })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          expect(res.body.message).to.be.equal('Invalid credentials');
          done();
        });
    });
  });

  describe('Get Users', () => {
    it('should not get all users with invalid token', (done) => {
      request(app)
        .get('/api/v1/users')
        .set('Accept', 'application/json')
        .set('Authorization', `${process.env.USER_TOKEN}invalid`)
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(401);
          expect(res.body.code).to.be.equal(401);
          expect(res.body.message).to.be.equal('Invalid token');
          done();
        });
    });

    it('should not get all users with without token', (done) => {
      request(app)
        .get('/api/v1/users')
        .set('Accept', 'application/json')
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(401);
          expect(res.body.code).to.be.equal(401);
          expect(res.body.message).to.be.equal(
            'Access denied, a valid access token is required',
          );
          done();
        });
    });

    it('should get all users', (done) => {
      request(app)
        .get('/api/v1/users')
        .set('Accept', 'application/json')
        .set('Authorization', `${process.env.USER_TOKEN}`)
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.code).to.be.equal(200);
          expect(res.body.message).to.be.equal('Users fetched successfully');
          done();
        });
    });

    it('should get top three users', (done) => {
      request(app)
        .get('/api/v1/users/top')
        .set('Accept', 'application/json')
        .set('Authorization', `${process.env.USER_TOKEN}`)
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.code).to.be.equal(200);
          expect(res.body.message).to.be.equal('Top users fetched successfully');
          done();
        });
    });
  });
});
