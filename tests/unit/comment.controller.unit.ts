import { expect } from 'chai';
import { Request, Response, NextFunction } from 'express';
import sinon from 'sinon';

import * as controller from '../../app/controllers/comment.controllers';

describe('Post controller', () => {
  let req: Record<string, any>;
  let res: Record<string, any>;
  let next: sinon.SinonStub;

  beforeEach(() => {
    req = { body: {}, params: { postId: '' } };
    res = { json: sinon.stub(), status: sinon.stub().returnsThis() };
    next = sinon.stub();
  });

  it('should call createPost function', async () => {
    await controller.createComment(req as Request, res as Response, next as NextFunction);
    expect(res.status.calledOnce).to.equal(false);
  });
});
