/* eslint no-multi-str: 1 */
var assert = require("chai").assert;
var chop = require("../chopper/chopper");

describe('chopper', function() {
    var gFixtureString = "De pruimeboom \
Eene vertelling \
\n\
Jantje zag eens pruimen hangen, o! als eieren zo groot. \
't Scheen, dat Jantje wou gaan plukken, schoon zijn vader 't hem verbood. \
\n\n\
Hier is, zei hij, noch mijn vader, noch de tuinman, die het ziet: \
Aan een boom, zo vol geladen, mist men vijf zes pruimen niet. \
\n\n\
Maar ik wil gehoorzaam wezen, en niet plukken: ik loop heen. \
Zou ik, om een hand vol pruimen, ongehoorzaam wezen? Neen. \
\n\n\
Voord ging Jantje: maar zijn vader, die hem stil beluisterd had, \
Kwam hem in het loopen tegen voor aan op het middelpad. \
\n\n\
Kom mijn Jantje, zei de vader, kom mijn kleine hartedief! \
Nu zal ik u pruimen plukken; nu heeft vader Jantje lief. \
\n\n\n\n\n\
Daar op ging Papa aan 't schudden, Jantje raapte schielijk op; \
Jantje kreeg zijn hoed vol pruimen, en liep heen op een galop.";

    chop.init(gFixtureString);
    chop.setSpeed(100);

    describe('#getLength', function() {
        it('Length calc for simple string ok.', function() {
            assert.equal(144, chop.getLength());
        });
    });
    describe('#getPosition', function() {
        it('doesnt scroll beyond the last word', function() {
            chop.incPosition(1000);
            assert.equal(144, chop.getPosition());
            assert.equal(100, chop.getPercentage());
        });
        it('doesnt scroll before the first word', function() {
            chop.decPosition(10000);
            assert.equal(0, chop.getPosition());
            assert.equal(0, chop.getPercentage());
        });
    });
    describe('#getEstimatedTimeToGo', function(){
        it('returns the correct time to go', function() {
            chop.setPosition(0);
            assert.equal(86400, chop.getEstimatedTimeToGo());
        });
    });
    describe('#getAverageSpeed', function(){
        it('returns an (estimated) average speed ~ the set one', function() {
            chop.setPosition(0);
            assert.equal(100, Math.floor(chop.getAverageSpeed()));
        });
    });
    describe('#getDisplayTime', function(){
        it('returns the correct display time for a normal word', function() {
            chop.setPosition(4);
            assert.equal("Jantje", chop.getCurrentWord());
            assert.equal(600, chop.getDisplayTime());
        });
        it('adds a little extra for commas', function() {
            chop.setPosition(8);
            assert.equal("hangen,", chop.getCurrentWord());
            assert.equal(920, chop.getDisplayTime());
        });
        it("doesn't break but returns 0 when there is no word to calc", function() {
            chop.setPosition(100000);
            assert.equal(0, chop.getDisplayTime());
        });
    });
    describe('#inc, #dec', function(){
        it('passes the identity test for speed inc/dec', function() {
            chop.incSpeed(5);
            assert.equal(105, chop.getSpeed());
            chop.decSpeed(5);
            assert.equal(100, chop.getSpeed());
        });
    });
    describe('#gotoStartOfSentence', function(){
        it('goes to start of current sentence', function(){
            chop.setPosition(17);
            chop.gotoStartOfSentence();
            assert.equal(14, chop.getPosition());
            assert.equal("'t", chop.getCurrentWord());
        });
        it('goes to start of previous sentence when current word is start of current sentence', function(){
            chop.setPosition(14);
            chop.gotoStartOfSentence();
            chop.gotoStartOfSentence();
            assert.equal(0, chop.getPosition());
            assert.equal("De", chop.getCurrentWord());
        });
        it('if on end of current sentence goes back to start', function(){
            chop.setPosition(37);
            chop.gotoStartOfSentence();
            assert.equal(28, chop.getPosition());
            assert.equal("Hier", chop.getCurrentWord());
        });
    });
    describe('#gotoEndOfSentence', function(){
        it('goes to end of current sentence', function(){
            chop.setPosition(3);
            chop.gotoEndOfSentence();
            assert.equal(9, chop.getPosition());
            assert.equal("o!", chop.getCurrentWord());
        });
    });
    describe('#gotoStartOfNextSentence', function(){
        it('goes to start of next sentence', function(){
            chop.setPosition(3);
            chop.gotoStartOfNextSentence();
            assert.equal(10, chop.getPosition());
            assert.equal("als", chop.getCurrentWord());
        });
    });
    describe('#gotoStartOfNextParagraph', function(){
        it('goes to start of next paragraph', function(){
            chop.setPosition(3);
            chop.gotoStartOfNextParagraph();
            assert.equal(28, chop.getPosition());
            assert.equal("Hier", chop.getCurrentWord());
        });
    });
    describe('#setSpeedFraction', function(){
        it('Derives the correct speed from a relative value', function(){
            chop.setSpeedFraction(0.5);
            assert.equal(330, chop.getSpeed());
            assert.equal(0.5, chop.getSpeedFraction());
        });
        it('Derives the correct relative speed from an absolute value', function(){
            chop.setSpeed(465);
            assert.equal(465, chop.getSpeed());
            assert.equal(0.75, chop.getSpeedFraction());
        });
    });
});
