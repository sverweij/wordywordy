var assert = require("chai").assert;
var gear = require("../chopper/gear");

describe("gear", function () {
  gear.setSpeed(100);

  describe("#inc, #dec", function () {
    it("passes the identity test for speed inc/dec", function () {
      gear.incSpeed(5);
      assert.equal(105, gear.getSpeed());
      gear.decSpeed(5);
      assert.equal(100, gear.getSpeed());
    });
  });
});
