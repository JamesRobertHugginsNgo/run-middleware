export default async function runMiddleware(
	middleware,
	context,
	isReverseOrder = false,
) {
	let index;
	let checkEndOfChain;
	let setNextIndex;
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
