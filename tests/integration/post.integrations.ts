import { expect } from 'chai';
import request from 'supertest';

import app from '../../app/server';

const post = {
  title: 'The truth',
  description: 'The truth about life',
  content: 'Eum omnis ratione qui quia perferendia',
};

describe('Post', () => {
  describe('Create Post', () => {
    it('should create post successfully', (done) => {
      request(app)
        .post(`/api/v1/users/${1}/posts`)
        .set('Accept', 'application/json')
        .set('Authorization', `${process.env.USER_TOKEN}`)
        .send(post)
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(201);
          expect(res.body.code).to.be.equal(201);
          expect(res.body.message).to.be.equal('Post created successfully');
          expect(res.body).to.be.have.property('data');
          done();
        });
    });

    it('should throw error for missing field', (done) => {
      request(app)
        .post(`/api/v1/users/${1}/posts`)
        .set('Accept', 'application/json')
        .set('Authorization', `${process.env.USER_TOKEN}`)
        .send({
          title: 'The truth',
        })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          expect(res.body.message).to.be.equal('content is required');
          done();
        });
    });

    it('should throw error if user is not found', (done) => {
      request(app)
        .post(`/api/v1/users/${100}/posts`)
        .set('Accept', 'application/json')
        .set('Authorization', `${process.env.USER_TOKEN}`)
        .send(post)
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(404);
          expect(res.body.code).to.be.equal(404);
          expect(res.body.message).to.be.equal('User not found');
          done();
        });
    });
  });

  describe('Get Posts', () => {
    it('should get all posts', (done) => {
      request(app)
        .get(`/api/v1/users/${1}/posts`)
        .set('Accept', 'application/json')
        .set('Authorization', `${process.env.USER_TOKEN}`)
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.code).to.be.equal(200);
          expect(res.body.message).to.be.equal('Posts fetched successfully');
          done();
        });
    });
  });
});
