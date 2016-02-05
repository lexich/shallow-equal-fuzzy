// inlined http://underscorejs.org/ realization isString, isNumber
var toString = Object.prototype.toString;

function isString(obj) {
  return toString.call(obj) === "[object String]";
}

function isNumber(obj) {
  return toString.call(obj) === "[object Number]";
}

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    /* eslint no-self-compare: 0 */
    return x !== x && y !== y;
  }
}

function isFuzzy(x, y) {
  /* eslint eqeqeq: 0 */
  if (x == y) {
    if ((isString(x) || isNumber(x)) && (isString(y) || isNumber(y))) {
      return true;
    }
  }
  return is(x, y);
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

// custom algoritm from https://github.com/facebook/fbjs
// fbjs/lib/shallowEqual
function shallowEqualFuzzy(objA, objB) {
  if (isFuzzy(objA, objB)) {
    return true;
  }

  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }

  if (objA instanceof Array && objB instanceof Array) {
    if (objA.length !== objB.length) {
      return false;
    }
    // greed search
    var valA, iLen = objA.length;
    var equalityMap = new Array(iLen);
    for (var i = 0; i < iLen; i++) {
      valA = objA[i];
      if (shallowEqualFuzzy(valA, objB[i])) {
        // elements in array in normal order
        equalityMap[i] = true;
        continue;
      }

      // elements in array have different order
      var isEqual = false;
      for (var k = 0, kLen = objB.length; k < kLen; k++) {
        if (equalityMap[k]) {
          continue;
        }
        if (shallowEqualFuzzy(valA, objB[k])) {
          equalityMap[k] = true;
          isEqual = true;
          break;
        }
      }
      if (!isEqual) {
        return false;
      }
    }
    return true;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (var j = 0; j < keysA.length; j++) {
    if (!hasOwnProperty.call(objB, keysA[j]) ||
      !shallowEqualFuzzy(objA[keysA[j]], objB[keysA[j]])) {
      return false;
    }
  }
  return true;
}

module.exports = shallowEqualFuzzy;
