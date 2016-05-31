var expect    = require("chai").expect;
var tokenizer = require("../chopper/tokenizer");
var fixtures  = require("./fixtures");

describe('tokenizer', function() {
    describe('#tokenize', function(){
        it('null tokenized === [""]', function() {
            expect(tokenizer.tokenize(null)).to.deep.equal([""]);
        });
        it('empty string tokenized === [""]', function() {
            expect(tokenizer.tokenize("")).to.deep.equal([""]);
        });
        it('pruimeboom tokenized === pruimeboom_tokenized', function() {
            expect(tokenizer.tokenize(
                fixtures.pruimeboom
            )).to.deep.equal(
                fixtures.pruimeboom_tokenized
            );
        });
        it('laozi tokenized === laozi_tokenized', function() {
            expect(tokenizer.tokenize(
                fixtures.laozi
            )).to.deep.equal(
                fixtures.laozi_tokenized
            );
        });
    });
});
