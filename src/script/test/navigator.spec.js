var assert = require("chai").assert;
var navigator = require("../chopper/navigator");

describe("navigator", function () {
  beforeEach(function () {
    navigator.init(require("./fixtures").pruimeboom_tokenized, 0);
  });
  describe("#getLength", function () {
    it("Length calc for simple string ok.", function () {
      assert.equal(144, navigator.getLength());
    });
  });
  describe("#getPosition", function () {
    it("doesnt scroll beyond the last word", function () {
      navigator.incPosition(1000);
      assert.equal(144, navigator.getPosition());
      assert.equal(100, navigator.getPercentage());
    });
    it("doesnt scroll before the first word", function () {
      navigator.decPosition(10000);
      assert.equal(0, navigator.getPosition());
      assert.equal(0, navigator.getPercentage());
    });
  });
  describe("#gotoStartOfSentence", function () {
    it("goes to start of current sentence", function () {
      navigator.setPosition(17);
      navigator.gotoStartOfSentence();
      assert.equal(14, navigator.getPosition());
      assert.equal("'t", navigator.getCurrentWord());
    });
    it("goes to start of previous sentence when current word is start of current sentence", function () {
      navigator.setPosition(14);
      navigator.gotoStartOfSentence();
      navigator.gotoStartOfSentence();
      assert.equal(0, navigator.getPosition());
      assert.equal("De", navigator.getCurrentWord());
    });
    it("if on end of current sentence goes back to start", function () {
      navigator.setPosition(37);
      navigator.gotoStartOfSentence();
      assert.equal(28, navigator.getPosition());
      assert.equal("Hier", navigator.getCurrentWord());
    });
  });
  describe("#gotoEndOfSentence", function () {
    it("goes to end of current sentence", function () {
      navigator.setPosition(3);
      navigator.gotoEndOfSentence();
      assert.equal(9, navigator.getPosition());
      assert.equal("o!", navigator.getCurrentWord());
    });
  });
  describe("#gotoStartOfNextSentence", function () {
    it("goes to start of next sentence", function () {
      navigator.setPosition(3);
      navigator.gotoStartOfNextSentence();
      assert.equal(10, navigator.getPosition());
      assert.equal("als", navigator.getCurrentWord());
    });
  });
  describe("#gotoStartOfNextParagraph", function () {
    it("goes to start of next paragraph", function () {
      navigator.setPosition(3);
      navigator.gotoStartOfNextParagraph();
      assert.equal(28, navigator.getPosition());
      assert.equal("Hier", navigator.getCurrentWord());
    });
  });
  describe("tests on null values", function () {
    beforeEach(function () {
      navigator.init([""]);
    });
    it("returns the empty string when asked for the current word", function () {
      assert.equal("", navigator.getCurrentWord());
    });
    it("returns 1 when asked for the length", function () {
      assert.equal(1, navigator.getLength());
    });
    it("returns 0 when asked for the percentage", function () {
      assert.equal(0, navigator.getPercentage());
    });
    it("returns 0 when asked for the current position", function () {
      assert.equal(0, navigator.getPosition());
    });
    xit("returns 0 when asked for the current position, even when set to 69", function () {
      navigator.setPosition(69);
      assert.equal(0, navigator.getPosition());
      assert.equal("", navigator.getCurrentWord());
    });
  });
});
