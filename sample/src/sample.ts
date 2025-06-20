import runMiddleware, * as RunMiddleware from '../../dist/run-middleware.js';

interface Context { title: string };

const middlewareRegistry: RunMiddleware.Middleware<Context>[] = [
	(context: Context) => {
		console.log(0, context);
		return true;
	},
	(context: Context) => {
		console.log(1, context);
		return true;
	},
	(context: Context) => {
		console.log(2, context);
	}
];

async function run() {
	await runMiddleware(middlewareRegistry, { title: 'hello' });
	await runMiddleware(middlewareRegistry, { title: 'hello' }, true);
}
run();
