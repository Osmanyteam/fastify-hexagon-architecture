import type { FastifyRequest } from "fastify";
import type RequestUser from "./requestUser.type";

export default (request:FastifyRequest, _: any, done: any) => {
    if (!(request as RequestUser).user) {
        done(new Error('Unauthorized'));
    }
    done();
}