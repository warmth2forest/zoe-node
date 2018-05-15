const http = require('http');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const Zoe = require('../index.js');

function makeWorker() {
	const worker = cluster.fork();
	worker
		.once('error', (err) => {
		  console.log(err)
		})
		.once('exit', (code, signal) => {
			makeWorker();
			if (signal) {
			  console.log(`worker was killed by signal: ${signal}`);
			} else if (code !== 0) {
			  console.log(`worker exited with error code: ${code}`);
			} else {
			  console.log('worker success!');
			}
		});
}

if(cluster.isMaster) {
	for(let i = 0; i < numCPUs; i++) {
		makeWorker();
	}
	cluster.on('exit', (worker) => {
    console.log(`${worker.process.pid} died`);  
  });
} else {
	const app = new Zoe();
	app.setRouter();
	app.listen(3333);
}