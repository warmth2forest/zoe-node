'use strict'

const path = require('path');

class ZoeRouter {
	constructor(app) {
    this.app = app;
	}
	setRouters(app) {
	  const routerPath = app.routerPath || path.join(app.baseDir, 'routes/index.js');
    const errorLogPath = app.errorLogPath || path.join(process.cwd(), 'log');
	  const routers = require(routerPath)(app);
	  const svs = {};
	  app.loader.loadService().forEach((service) => {
      svs[service.name] = service.module;
    });
    Object.keys(routers).forEach((key) => {
      const [method, path] = key.split(' ');
      app.router[method](path, async (ctx, next) => {
        const handler = routers[key];
        try {
          await handler(ctx, svs, app, next);
        } catch(err) {
          ctx.body = err.description || err;
          ctx.status = err.statusCode || 500;
          console.log(err);
        }
      });
    });
    return app.router.routes();
	}
}

module.exports = ZoeRouter;