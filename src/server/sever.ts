import fastify, { FastifyInstance } from 'fastify';
import userRoutes from '../users/framework/user.router';

export default class Server {
  private server: FastifyInstance;

  constructor() {
    this.server = fastify({ logger: false });
    this.setup();
  }

  private async setup() {
    // await this.generateOpenAPI();
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

  // private async generateOpenAPI() {
  //   const pluginOpts: OAS3PluginOptions = {
  //     openapiInfo: {
  //       title: 'Test Document',
  //       version: '0.1.0',
  //     },
  //     publish: {
  //       ui: 'rapidoc',
  //       json: true,
  //       yaml: true,
  //     },
  //   };
  //   await this.server.register(OAS3Plugin, { ...pluginOpts });
  // }
}
