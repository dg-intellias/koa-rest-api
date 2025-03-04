import Router from 'koa-router';

import { validator } from '../core';
import { userValidationSchema } from '../users/user.validation-schema';
import { isLogged } from '../auth/auth';

import {
  getUsers,
  updateUser,
  deleteUserById,
  getUserById
} from '../users/user.services';

export const privateRouter = new Router({
  prefix: '/private'
});
privateRouter.use(isLogged);

privateRouter.get('/', async ctx => {
  try {
    const users = await getUsers();

    ctx.status = 200;
    ctx.body = { users };
  } catch (err) {
    ctx.throw(400, err.message);
  }
});

privateRouter.put('/:id',
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

privateRouter.delete('/:id', async ctx => {
  const { id } = ctx.params;

  try {
    const currDb = await deleteUserById(id);

    ctx.status = 200;
    ctx.body = currDb;
  } catch (err) {
    ctx.throw(400, err.message);
  }
});

privateRouter.get('/:id/my-space', async ctx => {
  const { id } = ctx.params;

  try {
    const privateUser = await getUserById(id);

    ctx.status = 200;
    ctx.body = { message: `Welcome to your own space, ${privateUser.username}` };
  } catch (err) {
    ctx.throw(401, err.message);
  }
});

privateRouter.post('/my-space', async ctx => {
  ctx.body = { message: 'Prepare for today\'s project' };
});
