import type {
  FastifyReply,
  FastifyRequest,
  RouteShorthandOptions,
} from "fastify";
// import httpStatus from "http-status";
import { Type, Static } from "@sinclair/typebox";
import UserApplication from "../application/user.application";
import UserImplementation from "./user.implementation";
const userApplication = new UserApplication(new UserImplementation());

const bodyLogin = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String(),
});
const LoginResponse = Type.Object({
  status: Type.String(),
  data: Type.Object({
    accessToken: Type.String(),
    refreshToken: Type.String(),
  }),
});
type LoginResponse = Static<typeof LoginResponse>;
const loginOpts: RouteShorthandOptions = {
  schema: {
    body: bodyLogin,
    response: {
      200: LoginResponse,
    },
  },
};
const login = async function (
  request: FastifyRequest<{ Body: Static<typeof bodyLogin> }>,
  reply: FastifyReply
) {
  const { email, password } = request.body;
  const tokens = await userApplication.login(email, password);
  console.log(tokens);
  reply.send({
    status: "success",
    data: tokens,
  });
};

const bodyCreateAccount = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String(),
  username: Type.String(),
});
const createAccountOpts: RouteShorthandOptions = {
  schema: {
    body: bodyLogin,
    response: {
      200: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          data: {
            type: "object",
          },
        },
      },
    },
  },
};
const createAccount = async function (
  request: FastifyRequest<{ Body: Static<typeof bodyCreateAccount> }>,
  reply: FastifyReply
) {
  const { username, email, password } = request.body;
  await userApplication.createUser({
    username,
    email,
    password,
  });
  reply.send({
    status: "success",
  });
};

export default {
  login: {
    opts: loginOpts,
    bodySchema: bodyLogin,
    handle: login,
  },
  createAccount: {
    opts: createAccountOpts,
    bodySchema: bodyCreateAccount,
    handle: createAccount,
  },
};
