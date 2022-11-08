import type { FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify';
import { Type, Static } from '@sinclair/typebox';
import UserApplication from '../application/user.application';
import UserImplementation from './user.implementation';
import type UserDB from './user.db';
import verifyToken from '../../shared/verifyToken';
const userApplication = new UserApplication(new UserImplementation());

const bodyLogin = Type.Object({
  email: Type.String({ format: 'email' }),
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
      200: LoginResponse
    },
  },
};
const login = async function (request: FastifyRequest<{ Body: Static<typeof bodyLogin> }>, reply: FastifyReply) {
  const { email, password } = request.body;
  const tokens = await userApplication.login(email, password);
  reply.send({
    status: 'success',
    data: tokens,
  });
};

const bodyCreateAccount = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String(),
  username: Type.String(),
});
const createAccountOpts: RouteShorthandOptions = {
  schema: {
    body: bodyLogin,
    response: {
      200: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
          },
          data: {
            type: 'object',
          },
        },
      },
    },
  },
};
const createAccount = async function (
  request: FastifyRequest<{ Body: Static<typeof bodyCreateAccount> }>,
  reply: FastifyReply,
) {
  const { username, email, password } = request.body;
  await userApplication.createUser({
    username,
    email,
    password,
  });
  reply.send({
    status: 'success',
  });
};

const bodyUpdateAccount = Type.Object({
  username: Type.String(),
});
const UpdateAccountResponse = Type.Object({
  status: Type.String(),
  data: Type.Object({
    id: Type.Number(),
    username: Type.String(),
    email: Type.String({ format: 'email' }),
  }),
});
type UpdateAccountResponse = Static<typeof UpdateAccountResponse>;
const updateAccountOpts: RouteShorthandOptions = {
  preHandler: verifyToken,
  schema: {
    body: bodyUpdateAccount,
    response: {
      200: UpdateAccountResponse
    },
  },
};
const updateAccount = async function (
  request: FastifyRequest<{ Body: Static<typeof bodyUpdateAccount> }>,
  reply: FastifyReply,
) {
  const { username } = request.body;
  const currentUser = (request as unknown as { user:UserDB }).user;
  if (!currentUser || !currentUser.id) throw new Error('User not found');
  const userUpdated = await userApplication.updateUser(currentUser.id, { username });
  reply.send({ status: 'success', data: userUpdated });
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
  updateAccount: {
    opts: updateAccountOpts,
    bodySchema: bodyUpdateAccount,
    handle: updateAccount,
  },
};
