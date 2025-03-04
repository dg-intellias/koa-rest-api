import { verifyToken } from '../core';

export const isLogged = async (ctx, next) => {
  const authorization = ctx.get('authorization');
  if (!authorization) {
    ctx.throw(401);
  }

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer' || !verifyToken(token)) {
    ctx.throw(403);
  }

  await next();
}
