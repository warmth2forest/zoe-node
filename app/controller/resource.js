module.exports = {
  async getFilePath(ctx, service, app, next) {
    ctx.body = await service.resourceService.resouceInfo(ctx);
  },
  async getFilePath1(ctx, service, app, next) {
    ctx.body = await service.resourceService.resouceInfo1(ctx);
  },
  async getFilePath2(ctx, service, app, next) {
    ctx.body = await service.resourceService.resouceInfo2(ctx);
  }
};