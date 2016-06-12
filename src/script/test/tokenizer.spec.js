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
        it('does not treat abbreviations as consecutive line ends', function() {
            expect(tokenizer.tokenize(
                "This is a.o. the best."
            )).to.deep.equal(
                ["This", "is", "a.o.", "the", "best."]
            );
        });
        it('Corrects for forgotten spaces after ', function() {
            expect(tokenizer.tokenize(
                "This is the best.But I forgot a space."
            )).to.deep.equal(
                ["This", "is", "the", "best.", "But", "I", "forgot", "a", "space."]
            );
        });
    });
});
