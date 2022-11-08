import fastify, { FastifyInstance } from 'fastify';
import env from '../shared/env';
import jwt from 'jsonwebtoken';
import userRoutes from '../users/framework/user.router';
import UserDB from '../users/framework/user.db';
import type RequestUser from '../shared/requestUser.type';

export default class Server {
  private server: FastifyInstance;

  constructor() {
    this.server = fastify({ logger: true });
    this.setup();
  }

  private async setup() {
    await this.jwtSetup();
    this.setRouter();
    this.server.listen({ port: 3002 }, async (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
  }

  private async setRouter() {
    const options = { prefix: '/v1', logLevel: 'debug' };
    await this.server.register(userRoutes, options);
  }

  private async jwtSetup() {
    this.server.addHook('onRequest', async (request, _) => {
      if (request.headers['authorization']) {
        const jwtObject = jwt.verify(request.headers['authorization'].replace(/Bearer /, ''), env.passphrase) as { id: string };
        const user = await UserDB.query().findById(jwtObject.id);
        (request as RequestUser).user = user;
      }
    });
  }
}
