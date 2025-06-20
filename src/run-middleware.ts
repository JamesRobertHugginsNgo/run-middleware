export type Middleware<C extends Record<string, any>> = (context: C) => Promise<any | void> | any | void;

export default async function runMiddleware<C extends Record<string, any>>(
	middleware: Middleware<C>[],
	context: C,
	isReverseOrder: boolean = false
): Promise<any> {
	let index: number;
	let checkEndOfChain: () => boolean;
	let setNextIndex: () => void;

	if (isReverseOrder) {
		index = middleware.length - 1;
		checkEndOfChain = () => index < 0;
		setNextIndex = () => void index--;
	} else {
		index = 0;
		checkEndOfChain = () => index == middleware.length;
		setNextIndex = () => void index++;
	}

	while (!checkEndOfChain()) {
		try {
			const result = await Promise.resolve(middleware[index](context));
			if (result !== undefined) {
				return result;
			}
			setNextIndex();
		} catch (error) {
			throw error;
		}
	}

	throw new Error('End of Chain: No middleware returned a defined value.');
}
