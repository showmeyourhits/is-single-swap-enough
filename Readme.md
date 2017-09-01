# Is single swap enough to sort array?

I ask myself that **everyday**.
And finally i can know the answer.

---

## Problem

Given an array `A` of length `N` return `true` if `A` can be sorted using at most **single** element swap. Return `false` otherwise.

---

## Install

`npm install is-single-swap-enough`

---

## Example
```javascript
const isSingleSwapEnough = require('is-single-swap-enough');

isSingleSwapEnough([1, 3, 2, 4]); // true

isSingleSwapEnough([40, 50, 10]); // false
```
---

## Documentation
#### isSingleSwapEnough
```javascript
isSingleSwapEnough(array, [comparator], [isSortingDescending]) => boolean
```
### Arguments
#### array
Array of `any` items. If compare function is not passed, then assumed, that this is `number[]`
#### comparator
*Optional*. Function that does compare items in array. For more info [go to MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
#### isSortingDescending
*Optional*. Defines sort order: defaults to `false`.

---

###### Thanks to [this](https://www.youtube.com/watch?v=HUaCQdyxTDU)