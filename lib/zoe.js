'use strict'

const KoaAppication = require('koa')
const KoaRouter = require('koa-router')
const assert = require('assert')
const fs = require('fs')
const path = require('path')
const cors = require('koa-cors')
const koaBody = require('koa-bodyparser')
const logger = require('koa-logger')

const ZoeRouter = require('./utils/router.js');
const ZoeLoader = require('./loader/zoe_loader.js');

const ROUTER = Symbol('ZoeCore#router');

class ZoeCore extends KoaAppication {
  constructor(props={}) {
		props.baseDir = props.baseDir || path.join(process.cwd(), 'app');

		assert(typeof props.baseDir === 'string', 'props.baseDir required, and must be a string');
		assert(fs.existsSync(props.baseDir), `Directory ${props.baseDir} not exists`);
    assert(fs.statSync(props.baseDir).isDirectory(), `Directory ${props.baseDir} is not a directory`);

    super();

    this.baseDir = props.baseDir;
    this.routerPath = props.routerPath;
    this.errorLogPath = props.errorLogPath;

    this.router = new KoaRouter();
    this.loader = new ZoeLoader(props);

    const controllers = this.loader.loadController();
    this.controller = {};
    controllers.forEach((crl) => {
      this.controller[crl.name] = crl.module;
    });

    this.config = {};
    this.loader.loadConfig().forEach((config) => {
      this.config = { ...this.config, ...config.module };
    });

    this.use(cors());
    this.use(koaBody());
    this.use(logger());
    
    process.on('uncaughtException', (err) => {
			console.log('Caught exception: ' + err);
		});
  }
  setRouter() {
		if(this[ROUTER]) {
			this.use(this[ROUTER]);
		}
		const router = this[ROUTER] = new ZoeRouter().setRouters(this);
		this.use(router);
	} 
}

module.exports = ZoeCore;