import Router from 'koa-router';

import { validator } from '../core';
import { generateToken } from '../core/token';
import { createUserValidationSchema, } from '../users/user.validation-schema';
import { signInValidationSchema } from './auth.validation-schema';
import { createUser, getUserByEmail } from '../users/user.services'

export const authRouter = new Router({
  prefix: '/auth'
});

authRouter.post('/sign-up',
  validator(createUserValidationSchema),
  async (ctx) => {
    try {
      const newUser = await createUser(ctx.request.body);

      ctx.status = 201;
      ctx.body = { message: 'User registered successfully!', newUser };
    } catch (err) {
      ctx.throw(400, err.message);
    }
  }
);

authRouter.post('/sign-in',
  validator(signInValidationSchema),
  async (ctx) => {
    try {
      const user = await getUserByEmail(ctx.request.body);

      const token = generateToken(user);

      ctx.status = 200;
      ctx.body = { message: `Login successful. Welcome, ${user.username}`, token };
    } catch (err) {
      ctx.throw(401, err.message);
    }
  }
);
