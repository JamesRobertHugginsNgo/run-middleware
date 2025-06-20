export type Middleware<C extends Record<string, any>> = (
	context: C,
) => Promise<any | void> | any | void;
export default function runMiddleware<C extends Record<string, any>>(
	middleware: Middleware<C>[],
	context: C,
	isReverseOrder?: boolean,
): Promise<any>;
