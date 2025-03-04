import Router from 'koa-router';

import { validator } from '../core';
import { userValidationSchema, createUserValidationSchema } from './user.validation-schema';

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUserById
} from './user.services';

export const userRouter = new Router({
  prefix: '/users'
});

userRouter.get('/', async ctx => {
  ctx.body = await getUsers();
});

userRouter.get('/:id', async ctx => {
  const { id } = ctx.params;

  try {
    const user = await getUserById(id);

    ctx.status = 200;
    ctx.body = user;
  } catch (err) {
    ctx.throw(404, err.message);
  }
});

userRouter.post('/',
  validator(createUserValidationSchema),
  async ctx => {
    try {
      const newUser = await createUser(ctx.request.body);

      ctx.status = 201;
      ctx.body = { message: 'User created successfully!', newUser };
    } catch (err) {
      ctx.throw(400, err.message);
    }
  }
);

userRouter.put('/:id',
  validator(userValidationSchema),
  async ctx => {
    try {
      const { id } = ctx.params;
      const { body } = ctx.request;

      ctx.status = 200;
      ctx.body = await updateUser(id, body);
    } catch (err) {
      ctx.throw(404, err.message);
    }
  }
);

userRouter.delete('/:id', async ctx => {
  const { id } = ctx.params;

  try {
    const currDb = await deleteUserById(id);

    ctx.status = 200;
    ctx.body = currDb;
  } catch (err) {
    ctx.throw(400, err.message);
  }
});
