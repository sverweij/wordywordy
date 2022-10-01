var assert = require("chai").assert;
var chop = require("../chopper/chopper");

describe("chopper", function () {
  var gFixtureString = require("./fixtures").pruimeboom;

  beforeEach(function () {
    chop.init(gFixtureString);
    chop.setSpeed(100);
  });

  describe("#getEstimatedTimeToGo", function () {
    it("returns the correct time to go", function () {
      chop.setPosition(0);
      assert.equal(86400, chop.getEstimatedTimeToGo());
    });
  });
  describe("#getAverageSpeed", function () {
    it("returns an (estimated) average speed ~ the set one", function () {
      chop.setPosition(0);
      assert.equal(100, Math.floor(chop.getAverageSpeed()));
    });
  });
  describe("#getDisplayTime", function () {
    it("returns the correct display time for a normal word", function () {
      chop.setPosition(4);
      assert.equal("Jantje", chop.getCurrentWord());
      assert.equal(600, chop.getDisplayTime());
    });
    it("adds a little extra for commas", function () {
      chop.setPosition(8);
      assert.equal("hangen,", chop.getCurrentWord());
      assert.equal(920, chop.getDisplayTime());
    });
    it("doesn't break but returns 0 when there is no word to calc", function () {
      chop.setPosition(100000);
      assert.equal(0, chop.getDisplayTime());
    });
  });
});
