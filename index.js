/**
 * Compares values using default > and < operators
 * @param {T} a - first value
 * @param {T} b - second value
 * @returns {number}
 * @template T
 */
const defaultComparator = (a, b) => {
	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
};

/**
 * Swap array elements at passed indexes. Mutates array
 * @param {T[]} array 
 * @param {number} firstIndex
 * @param {number} secondIndex
 * @returns {T[]} same array
 * @template T
 */
const swapArrayElements = (array, firstIndex, secondIndex) => {
	const tmp = array[firstIndex];

	array[firstIndex] = array[secondIndex];
	array[secondIndex] = tmp;

	return array;
}

/**
 * @typedef {function} Comparator
 * @param {T} a - first value
 * @param {T} b - second value
 * @returns {number}
 * 
 * @param {T[]} array of passed values
 * @param {?Comparator} comparator
 * @param {?boolean} isSortingDescending
 * @return {boolean}
 * @template T
 */
function isSingleSwapEnough (array, comparator, isSortingDescending) {
	comparator = comparator || defaultComparator;
	let firstMissplaced = -1;
	let rightPosition = isSortingDescending ? 0 : array.length - 1;
	let lastCompareResult = isSortingDescending ? 1 : -1;

	// Find first misplaced element from left.
	for (let i = 0; i < array.length - 1; i++) {
		const currentCompareResult = comparator(array[i], array[i + 1]);

		if (currentCompareResult !== lastCompareResult && currentCompareResult) {
			firstMissplaced = i;
			break;
		}
		lastCompareResult = currentCompareResult || lastCompareResult;
	}

	// If none element is missplaced than array already sorted.
	if (firstMissplaced === -1) return true;

	lastCompareResult = isSortingDescending ? -1 : 1;

	// Find right place for missplaced
	for (let i =  array.length - 1; i > 0; i--) {
		const currentCompareResult = comparator(array[i], array[firstMissplaced]);

		if (currentCompareResult !== lastCompareResult && currentCompareResult) {
			rightPosition = i;
			break;
		}

		lastCompareResult = currentCompareResult || lastCompareResult
	}

	// Swap elements...
	array = swapArrayElements(array, firstMissplaced, rightPosition);

	lastCompareResult = isSortingDescending ? 1 : -1;
	let canBeSorted = true;

	// ... and check array sort order
	for (let i = 0; i < array.length - 1; i++) {
		const currentCompareResult = comparator(array[i], array[i + 1]);
		if (currentCompareResult !== lastCompareResult && currentCompareResult) {
			canBeSorted = false;
			break;
		}
		lastCompareResult = currentCompareResult || lastCompareResult;
	}

	// Swap back.
	array = swapArrayElements(array, firstMissplaced, rightPosition);

	return canBeSorted;
}

module.exports = isSingleSwapEnough;
module.exports.defaultComparator = defaultComparator;
module.exports.swapArrayElements = swapArrayElements;
