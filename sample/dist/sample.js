import runMiddleware from '../../dist/run-middleware.js';
const middlewareRegistry = [
	(context) => {
		console.log(0, context);
		return true;
	},
	(context) => {
		console.log(1, context);
		return true;
	},
	(context) => {
		console.log(2, context);
	},
];
async function run() {
	await runMiddleware(middlewareRegistry, { title: 'hello' });
	await runMiddleware(middlewareRegistry, { title: 'hello' }, true);
}
run();
