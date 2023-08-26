import { expect } from 'chai';
import { Request, Response, NextFunction } from 'express';
import sinon from 'sinon';

import * as controller from '../../app/controllers/user.controllers';
import * as service from '../../app/services/user.services';

describe('User controller', () => {
  let req: Record<string, any>;
  let res: Record<string, any>;
  let next: sinon.SinonStub;

  beforeEach(() => {
    req = { body: {} };
    res = { json: sinon.stub(), status: sinon.stub().returnsThis() };
    next = sinon.stub();
  });

  it('should call register function', async () => {
    await controller.register(req as Request, res as Response, next as NextFunction);
    expect(res.status.calledOnce).to.equal(false);
  });

  it('should call login function', async () => {
    await controller.login(req as Request, res as Response, next as NextFunction);
    expect(res.status.calledOnce).to.equal(false);
  });

  it('should call getAllUsers function', async () => {
    const error = new Error('Failed to get all users');
    sinon.stub(service, 'getAllUsers').rejects(error);
    await controller.getAllUsers(req as Request, res as Response, next as NextFunction);

    expect(res.status.calledOnce).to.equal(false);
  });

  it('should call getTopThreeUsers function', async () => {
    const error = new Error('Failed to get top three users');
    sinon.stub(service, 'getTopThreeUsers').rejects(error);
    await controller.getTopThreeUsers(req as Request, res as Response, next as NextFunction);

    expect(res.status.calledOnce).to.equal(false);
  });
});
