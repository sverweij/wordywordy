var assert = require("chai").assert;
var fmt = require("../utl/formatting");

describe("formatting", function () {
  describe("#formatTime", function () {
    it("should return 00:00 for input 0", function () {
      assert.equal("00:00", fmt.formatTime(0, false));
    });
    it("should return 00:00 for input 0", function () {
      assert.equal("00:00.0", fmt.formatTime(0, true));
    });
    it("should return 00:01 for input 1000", function () {
      assert.equal("00:01", fmt.formatTime(1000));
    });
    it("should round to input not a mod of 1000", function () {
      assert.equal("00:00", fmt.formatTime(800));
    });
    it("should not round for input 800 when showing millis", function () {
      assert.equal("00:00.800", fmt.formatTime(800, true));
    });
    it("should round for input > 1000 that is not a mod of 1000", function () {
      assert.equal("00:01", fmt.formatTime(1501));
    });
    it("should not round for input > 1000 that is not a mod of 1000, when millis requested", function () {
      assert.equal("00:01.501", fmt.formatTime(1501, true));
    });
    it("should not add a 0 for seconds/ minutes > 10", function () {
      assert.equal("10:59", fmt.formatTime(659000));
    });
    it("should display non-0-padded hours for input > 36000000 ", function () {
      assert.equal("1:01:00", fmt.formatTime(3660481));
    });
  });
  describe("#sanitizeNumber", function () {
    it("sanitize valid string", function () {
      assert.equal(481, fmt.sanitizeNumber("481", 1337));
    });
    it("sanitize invalid string", function () {
      assert.equal(1337, fmt.sanitizeNumber("x481", 1337));
    });
    it("sanitize valid number", function () {
      assert.equal(42, fmt.sanitizeNumber(42, 1337));
    });
    it("sanitize NaN", function () {
      assert.equal(1234, fmt.sanitizeNumber(NaN, 1234));
    });
  });
  describe("#sanitizeBooleanesque", function () {
    it("sanitize non booleanesque", function () {
      assert.equal(
        false,
        fmt.sanitizeBooleanesque("this is not a booleanesque")
      );
    });
    it("sanitize booleanesque", function () {
      assert.equal(true, fmt.sanitizeBooleanesque("1"));
    });
    it("sanitize booleanesque", function () {
      assert.equal(false, fmt.sanitizeBooleanesque("0"));
    });
  });
});
