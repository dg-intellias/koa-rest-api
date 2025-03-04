import Koa from 'koa';
import koaBody from 'koa-body';

import router from './router';

const app = new Koa();

app.use(koaBody());
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err?.status ?? 500;
    ctx.body = err.message;
  }
});
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
