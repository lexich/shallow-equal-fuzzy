[![Build Status](https://travis-ci.org/lexich/shallow-equal-fuzzy.svg)](https://travis-ci.org/lexich/shallow-equal-fuzzy)
[![NPM version](https://badge.fury.io/js/shallow-equal-fuzzy.svg)](http://badge.fury.io/js/shallow-equal-fuzzy)
[![Coverage Status](https://coveralls.io/repos/lexich/shallow-equal-fuzzy/badge.png?branch=master)](https://coveralls.io/r/lexich/shallow-equal-fuzzy?branch=master)

### About shallow-equal-fuzzy
Update version of shallowEqual algoritm from https://github.com/facebook/fbjs/blob/master/src/core/shallowEqual.js with fuzzy functionality

```js
import sef from "shallow-equal-fuzzy";
sef("1", 1) === true;
sef([1, 2, 3], [3, 2, 1]) === true;
sef([1, "2", 3], ["3", 2, 1]) === true;
sef({ id: 1}, { id: "1"}) === true;
sef([{ id: 1}], [{id: "1"}]) === true;

// other functionality inherit from origin implementation
```
