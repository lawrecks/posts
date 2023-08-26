import { expect } from 'chai';
import { Request, Response, NextFunction } from 'express';
import sinon from 'sinon';

import * as controller from '../../app/controllers/post.controllers';
import * as service from '../../app/services/post.services';

describe('Post controller', () => {
  let req: Record<string, any>;
  let res: Record<string, any>;
  let next: sinon.SinonStub;

  beforeEach(() => {
    req = { body: {}, params: { id: '' } };
    res = { json: sinon.stub(), status: sinon.stub().returnsThis() };
    next = sinon.stub();
  });

  it('should call createPost function', async () => {
    await controller.createPost(req as Request, res as Response, next as NextFunction);
    expect(res.status.calledOnce).to.equal(false);
  });

  it('should call getAllPosts function', async () => {
    const error = new Error('Failed to get all posts');
    sinon.stub(service, 'getAllPosts').rejects(error);
    await controller.getAllPosts(req as Request, res as Response, next as NextFunction);

    expect(res.status.calledOnce).to.equal(false);
  });
});
