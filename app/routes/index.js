module.exports = (app) => {
	//console.log(app.controller)
  return {
    'get /': app.controller.resource.getFilePath1,
    'get /v1': app.controller.resource.getFilePath,
    'get /v2': app.controller.resource.getFilePath2
  };
};