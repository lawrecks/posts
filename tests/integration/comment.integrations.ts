import { expect } from 'chai';
import request from 'supertest';

import app from '../../app/server';

const comment = {
  content: 'Eum omnis ratione qui quia perferendia',
};

describe('Comment', () => {
  describe('Create Comment', () => {
    it('should create comment successfully', (done) => {
      request(app)
        .post(`/api/v1/posts/${1}/comments`)
        .set('Accept', 'application/json')
        .set('Authorization', `${process.env.USER_TOKEN}`)
        .send(comment)
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(201);
          expect(res.body.code).to.be.equal(201);
          expect(res.body.message).to.be.equal('Comment created successfully');
          expect(res.body).to.be.have.property('data');
          done();
        });
    });

    it('should throw error for missing field', (done) => {
      request(app)
        .post(`/api/v1/posts/${1}/comments`)
        .set('Accept', 'application/json')
        .set('Authorization', `${process.env.USER_TOKEN}`)
        .send({})
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          expect(res.body.message).to.be.equal('content is required');
          done();
        });
    });

    it('should throw error if post is not found', (done) => {
      request(app)
        .post(`/api/v1/posts/${100}/comments`)
        .set('Accept', 'application/json')
        .set('Authorization', `${process.env.USER_TOKEN}`)
        .send(comment)
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(404);
          expect(res.body.code).to.be.equal(404);
          expect(res.body.message).to.be.equal('Post not found');
          done();
        });
    });
  });
});
