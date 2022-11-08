import type { Static } from '@sinclair/typebox';
import type { FastifyInstance } from 'fastify';
import controller from './user.controller';

export default (fastify: FastifyInstance, _: any, done: () => void) => {
  fastify.post<{ Body: Static<typeof controller.login.bodySchema> }>(
    '/login',
    controller.login.opts,
    controller.login.handle
  );
  fastify.post<{ Body: Static<typeof controller.createAccount.bodySchema> }>(
    '/signup',
    controller.createAccount.opts,
    controller.createAccount.handle
  );
  done();
};
