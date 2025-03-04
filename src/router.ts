import Router from 'koa-router';

import { authRouter } from './auth';
import { userRouter } from './users';

import { privateRouter } from './private';

const router = new Router({
  prefix: '/api/v1'
});

router.use(authRouter.routes());
router.use(userRouter.routes());

router.use(privateRouter.routes());

export default router;
