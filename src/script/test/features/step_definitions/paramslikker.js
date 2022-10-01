/* eslint new-cap: 0 */
var par = require("../../../utl/paramslikker");
var expect = require("chai").expect;

module.exports = function () {
  var gInput = "";

  this.Given(/^The paramslikker module is available$/, function () {
    expect(!!par).to.equal(true);
  });

  this.Given("Presented with $pInput", function (pInput) {
    gInput = pInput;
  });

  this.Then("The returned value should be $pObject", function (pObject) {
    var lObject = pObject === "the empty object" ? "{}" : pObject;

    if (gInput === "an empty URL") {
      expect(par.getParams()).to.deep.equal({});
    } else {
      expect(par.getParams(gInput)).to.deep.equal(JSON.parse(lObject));
    }
  });
};
