var assert = require("assert");
var chop = require("../chopper/chopper");

describe('chopper', function() {
    describe('#chop a simple string', function() {
        chop.init("Jantje zag eens pruimen hangen, o als eieren zo groot! 't scheen dat Jantje ze plukken wou, ofschoon zijn vader 't hem verbood.");
        chop.setSpeed(100);
        it('Length calc for simple string ok.', function() {
            assert.equal(23, chop.getLength());
        });
        it ('doesnt scroll beyond the last word', function() {
            chop.incPosition(1000);
            assert.equal(23, chop.getPosition());
            assert.equal(100, chop.getPercentage());
        });
        it ('doesnt scroll before the first word', function() {
            chop.decPosition(10000);
            assert.equal(0, chop.getPosition());
            assert.equal(0, chop.getPercentage());
        });
        it ('returns the correct time to go', function() {
            chop.setPosition(0);
            assert.equal(13800, chop.getEstimatedTimeToGo());
        });
        it ('returns an (estimated) average speed ~ the set one', function() {
            chop.setPosition(0);
            assert.equal(105, Math.floor(chop.getAverageSpeed()));
        });
        it ('returns the correct display time for a normal word', function() {
            chop.setPosition(0);
            assert.equal("Jantje", chop.getCurrentWord());
            assert.equal(600, chop.getDisplayTime());
        });
        it ('adds a little extra for commas', function() {
            chop.setPosition(4);
            assert.equal("hangen,", chop.getCurrentWord());
            assert.equal(920, chop.getDisplayTime());
        });
        it ('passes the identity test for speed inc/dec', function() {
            chop.incSpeed(5);
            assert.equal(105, chop.getSpeed());
            chop.decSpeed(5);
            assert.equal(100, chop.getSpeed());
        });
        it ('goes to start of current sentence', function(){
            chop.setPosition(17);
            chop.gotoStartOfSentence();
            assert.equal(10, chop.getPosition());
            assert.equal("'t", chop.getCurrentWord());
        });
        it ('goes to start of previous sentence when current word is start of current sentence', function(){
            chop.setPosition(17);
            chop.gotoStartOfSentence();
            chop.gotoStartOfSentence();
            assert.equal(0, chop.getPosition());
            assert.equal("Jantje", chop.getCurrentWord());
        });
        it ('goes to end of current sentence', function(){
            chop.setPosition(3);
            chop.gotoEndOfSentence();
            assert.equal(9, chop.getPosition());
            assert.equal("groot!", chop.getCurrentWord());
        });
        it ('if on end of current sentence goes back to start', function(){
            chop.setPosition(9);
            chop.gotoStartOfSentence();
            assert.equal(0, chop.getPosition());
            assert.equal("Jantje", chop.getCurrentWord());
        });
        it ('goes to start of next sentence', function(){
            chop.setPosition(3);
            chop.gotoStartOfNextSentence();
            assert.equal(10, chop.getPosition());
            assert.equal("'t", chop.getCurrentWord());
        });
    });
});
