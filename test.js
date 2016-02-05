"use strict";
/* global describe, it */
/* eslint object-curly-spacing: 0 */

var sef = require("./index");

var expect = require("chai").expect;

describe("shallowEqual fuzzy", function() {
  it("fuzzy compare number or string items", function() {
    expect(sef(1, 1)).to.be.true;
    expect(sef(1, "1")).to.be.true;
    expect(sef("1", 1)).to.be.true;
    expect(sef("0", 1)).to.be.false;
    expect(sef(0, "1")).to.be.false;
    expect(sef(+0, -0)).to.be.true;
  });
  it("fuzzy compare arrays", function() {
    expect(sef([], [])).to.be.true;
    expect(sef([1, 2, 3], [1, 2, 3])).to.be.true;
    expect(sef([1, 2, 3], ["1", "2", "3"])).to.be.true;
    expect(sef([1, 2, 3], [3, 2, 1])).to.be.true;
    expect(sef([1, 1, 2], [1, 2, 2])).to.be.false;
    expect(sef([3, 2, 1, 1], [1, 2, 3, 2])).to.be.false;
    expect(sef([1, "1", 2], [1, "2", 2])).to.be.false;
    expect(sef([{ id: 1}], [{ id: 1}])).to.be.true;
    expect(sef([{ id: 1}], [{ id: "1"}])).to.be.true;
  });
});

var shallowEqual = sef;
// https://github.com/facebook/fbjs/blob/master/src/core/__tests__/shallowEqual-test.js
describe("shallowEqual", function() {
  it("returns false if either argument is null", function() {
    expect(shallowEqual(null, {})).to.be.false;
    expect(shallowEqual({}, null)).to.be.false;
  });

  it("returns true if both arguments are null or undefined", function() {
    expect(shallowEqual(null, null)).to.be.true;
    expect(shallowEqual(undefined, undefined)).to.be.true;
  });

  it("returns true if arguments are not objects and are equal", function() {
    expect(shallowEqual(1, 1)).to.be.true;
  });

  it("returns true if arguments are shallow equal", function() {
    expect(
      shallowEqual(
        {a: 1, b: 2, c: 3},
        {a: 1, b: 2, c: 3}
      )
    ).to.be.true;
  });

  it("returns true when comparing NaN", function() {
    expect(shallowEqual(NaN, NaN)).to.be.true;

    expect(
      shallowEqual(
        {a: 1, b: 2, c: 3, d: NaN},
        {a: 1, b: 2, c: 3, d: NaN}
      )
    ).to.be.true;
  });

  it("returns false if arguments are not objects and not equal", function() {
    expect(
      shallowEqual(
        1,
        2
      )
    ).to.be.false;
  });

  it("returns false if only one argument is not an object", function() {
    expect(
      shallowEqual(
        1,
        {}
      )
    ).to.be.false;
  });

  it("returns false if first argument has too many keys", function() {
    expect(
      shallowEqual(
        {a: 1, b: 2, c: 3},
        {a: 1, b: 2}
      )
    ).to.be.false;
  });

  it("returns false if second argument has too many keys", function() {
    expect(
      shallowEqual(
        {a: 1, b: 2},
        {a: 1, b: 2, c: 3}
      )
    ).to.be.false;
  });

  // fuzzy effect
  it("returns true if arguments are not shallow equal", function() {
    expect(
      shallowEqual(
        {a: 1, b: 2, c: {}},
        {a: 1, b: 2, c: {}}
      )
    ).to.be.true;
  });
});
