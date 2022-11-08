import type { FastifyRequest } from "fastify";
import type UserDB from "../users/framework/user.db";

type RequestUser = FastifyRequest & { user: undefined | UserDB };
export default RequestUser;