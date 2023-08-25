import { expect } from 'chai';
import { Request, Response, NextFunction } from 'express';
import sinon from 'sinon';

import * as middleware from '../../app/middlewares/user.middlewares';

describe('User middleware', () => {
  let req: Record<string, any>;
  let res: Record<string, any>;
  let next: sinon.SinonStub;

  beforeEach(() => {
    req = { body: {} };
    res = { json: sinon.stub(), status: sinon.stub().returnsThis() };
    next = sinon.stub();
  });

  it('should call checkIfUserExists function', async () => {
    await middleware.checkIfUserExists(req as Request, res as Response, next as NextFunction);
    expect(res.status.calledOnce).to.equal(false);
  });

  it('should call verifyToken function', async () => {
    middleware.verifyToken(req as Request, res as Response, next as NextFunction);
    expect(res.status.calledOnce).to.equal(false);
  });
});
