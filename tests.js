const test = require('tape');
const foo = require('./index');

// # Main tests
test('Method should return boolean value', (t) => {
	t.equal(typeof foo([]), 'boolean', 'typeof result');
	t.end();
});

test('Method should return right values in trivial cases', (t) => {
	t.equal(foo([]), true, 'empty array');
	t.equal(foo([1]), true, 'single item array');
	t.equal(foo([2, 1]), true, 'two items array');
	t.end();
});
test('Method should return true in certain cases without passed comparator', (t) => {
	t.equal(foo([6, 2, 2]), true, '[6, 2, 2]');
	t.equal(foo([2, 2, 2, 2]), true, '[2, 2, 2, 2]');
	t.equal(foo([1, 5, 3, 7]), true, '[1, 5, 3, 7]');
	t.equal(foo([1, 5, 3, 3, 7]), true, '[1, 5, 3, 3, 7]');
	t.equal(foo([2, 2, 2, 5, 4]), true, '[2, 2, 2, 5, 4]');
	t.equal(foo([1, 5, 3, 3, 2, 6]), true, '[1, 5, 3, 3, 2, 6]');
	t.end();
});
	
test('Method should return false in certain cases without passed comparator', (t) => {
	t.equal(foo([5, 7, 3]), false, '[5, 7, 3]');
	t.equal(foo([1, 5, 5, 3, 7]), false, '[1, 5, 5, 3, 7]');
	t.equal(foo([1, 5, 3, 3, 4]), false, '[1, 5, 3, 3, 4]');
	t.end();
});

test('Method should return right values when array should be sorted in DESCENDING order', (t) => {
	t.equal(foo([], null, true), true, '[]');
	t.equal(foo([1], null, true), true, '[1]');
	t.equal(foo([5, 7], null, true), true, '[5, 7]');
	t.equal(foo([7, 5], null, true), true, '[7, 5]');
	t.equal(foo([3, 3, 3], null, true), true, '[3, 3, 3]');
	t.equal(foo([7, 5, 3], null, true), true, '[7, 5, 3]');
	t.equal(foo([7, 3, 5, 1], null, true), true, '[7, 3, 5, 1]');
	t.equal(foo([7, 3, 3, 5, 1], null, true), false, '[7, 3, 3, 5, 1]');
	t.end();
});

test('Method should work with custom comparator', (t) => {
	const comp = (left, right) => {
		if (left.length < right.length) return -1;
		if (left.length > right.length) return 1;
		return 0;
	};

	t.equal(foo(['ass', 'titties', 'ass n titties'], comp), true, `string length ['ass', 'titties', 'ass n titties']`);
	t.equal(foo(['ass', 'ass n titties', 'titties'], comp), true, `string length ['ass', 'ass n titties', 'titties']`);
	t.equal(foo(['ass', 'titties', 'ass', 'n', 'titties'], comp), false, `string length ['ass', 'titties', 'ass', 'n', 'titties']`);

	t.end();
});

// # Default Comparator
test('defaultComparator', (t) => {
	t.equals(foo.defaultComparator(5, 6), -1, 'place lower first');
	t.equals(foo.defaultComparator(50, 10), 1, 'place bigger last');
	t.equals(foo.defaultComparator(10, 10), 0, 'do not move equals');
	t.end();
});

// # Swapper Function
test('swapArrayElements', (t) => {
	const array = [];
	t.equals(foo.swapArrayElements(array), array, 'return same array');
	t.deepEqual(foo.swapArrayElements([1, 4, 0, 1], 2, 3), [1, 4, 1, 0], 'swap elements');
	t.end();
});
