# WordyWordy

WordyWordy takes text that's dropped on it and shows it. One word at a time. As fast as you want. Or as slow.

![screenshots](src/images/screenshots.gif)

## Why and for whom?
**Bigger**.
  You can show words stupid big when only displaying one of them at the time.
  This might be useful when you have low vision.

**Steadier**
  Text stays in the same place. When your field of vision is small, this
  can be more comfortable.

**Dyslexia friendly (?)**.
  I've read claims that presenting text this way helps people with dyslexia
  read more easily. I don't know. I have included a font designed for
  people with dyslexia, just in case. They're under keys `6`, `7`, `8`, `9` and `0`.

**Hands free**.
  It keeps on rolling. Practical when you want to read while doing
  something else. Working out for example.

**Faster**.
  It is possible to read faster than reading the typical ~250-300 words per minute.
  I get about 340 wpm comfortably, but I read some people get ~600 wpm, without
  loosing comprehension. The theory is that you don't need to move your eyes so
  much and won't need to hunt for the start of a sentence.

## Features
- Proportionally pauses on punctuation and paragraphs, for a natural reading experience.
- Adjustable speed. On the fly.
- Remembers your last text. And where you left of in it.
- Forward/ backward navigation with mouse and/ or keys. On the fly.
- Adjustable theme to match your taste. Or need:
  - Sepia/ Day/ Night
  - High contrast (yellow on black, fat letters)
  - Night low contrast
  - Regular and dyslexic friendly fonts.
- Supports Chinese/ Japanes/ Korean. There is a reason 字 translates to _character_, but also to _word_.
- Heuristics for correcting common typographic errors.
- Reading stats on the current text.
- It smiles. (Go on, drag something on it. You'll see).

## Keyboard and mouse bindings
You'll figure this out in a pinch. Probably without even checking this table. Trust me.

When you want this         |  keyboard                        | mouse
-------------------------- | -------------------------------- | ---------------------------------
pause/ play                | `SPACE` or `ENTER`               | click the "play" button (~ :arrow_forward:)
go slower                  | `DOWN` or `s`                    | click the button with the down arrow
go faster                  | `UP` or `w`                      | click the button with the up arrow
go back a word             | `LEFT` or `a`                    | scroll down or click the "next" button
go back a sentence         | `PAGEUP` or `q`                  | -
go forward a word          | `RIGHT` or `d`                   | scroll up or click the "previous" button
go forward a sentence      | `PAGEDOWN` or `e`                | -
go to start of text        | `HOME`                           | click the "home" button
cycle through themes       | `§`, ```                         | click the button with the smiley (~:sunglasses:)
switch to a theme directly | `1`, `2`, ..., `9`, `0`          | -
show amount of time left   | `t`                              | -
show stats                 | `i`                              | click the (i) button
save current position      | `b`                              | -
jump to position           | not implemented yet              | click in the progress bar (bottom)
clear                      | `c`                              | -
toggle full screen         | `f`                              | click the button with the outward (or inward, in full screen mode) pointing arrows

- @scrolling: effect depends a bit on your mouse/ track pad.
- @themes: `1`-`5` are the regular themes (with _high contrast_ on `5`),`6-0` the  dyslexic ones.
- @save current position: pausing or navigating automatically save the position. Heck, it even magically saves _speed_ and _theme_ along with the _position_.
  Hit `b` when you don't trust that. Or when you don't pause or navigate.
- @clear: makes WordyWordy forget  all stuff it usually remembers (buffer, title, last saved position, speed, theme).

## Bookmarklet
There is a [bookmarklet](bookmarklet.js). It works. It's not yet perfect.

## URL parameters
(Skip this if you don't know what an URL parameter is. You won't miss anything.)

parameter | explanation
--------- | -----------------
speed     | A `number` between 60 and 600 words per minute. When WordyWordy doesn't understand, it'll pick a default speed (300 wpm).
pos       | A number representing the position (word) to start reading. When WordyWordy doesn't understand, it will start at position 0.
text      | Text to read. Expected to be URI encoded. When left out, WordyWordy will start reading from the latest text you left last time your started it. Has precedence over the `canned` and `url` parameters described below.
theme     | a number between 0 and 18 - each of which represents a theme.
play      | 1 or 0 - if this parameter equals `1`, the text will automatically start playing, about a second after it was loaded.
loop      | 1 or 0 - if this parameter equals `1`, the text will infinitely loop. Usefull for kiosk display.
canned    | plays one of the texts pre-installed in WordyWordy. Values e.g. `intro`, `intro_nl` (which plays the soft landing/ instruction text in English or Dutch respectively), `thoughts`, `freedom`, `1984` (all three short test strings) and `laozi` (which plays the first few paragraphs from the 道德經 (Dàodé jīng) by 老子 (Lǎo zi) - useful for testing picture scripts)
url       | plays the text present at the provided url. WordyWordy uses ajax to access the url, so it is restricted to (1) the current domain or (2) content from sites for which CORS is enabled.


Example:
```
https://sverweij.github.io/wordywordy/index.html?speed=200&theme=6&pos=0&play=1&text=This reads some text to you at about 200 words per minute. The text is presented in the open dyslexic font with a sepia color scheme.
```

## A word on speeds
The speed you selected is the _target_ speed. It is a good indication of the actual speed.
However, the actual speed depends on the characteristics of the selected text. E.g.
- Your text contains many long words and short sentences: the actual speed will be _slower_ than the target speed.
- Your text contains many short words and long sentences: the actual speed will be _faster_.

## Licenses and dependencies
WordyWordy is free software [licensed under GPLv3](LICENSE). This
means (a.o.) you *can* use it as part of other free software. You
can *not* use it as part of non free software.

It uses [require.js](http://requirejs.org) for module management and the [screenfull.js](https://github.com/sindresorhus/screenfull.js)
library for getting in and out of full screen. Both libraries are
[MIT](http://opensource.org/licenses/MIT) licensed.

WordyWordy uses some non-standard fonts:
- **Roboto** (from Google's Android).
After hours of testing, this one came out as easiest on the eyes.
- **[Open Dyslexic](https://github.com/antijingoist/open-dyslexic)**.
Used in the dyslexic themes. Bottom heavy and asymetric, just like the theory
says it should. I hope it improves usability for dyslexic people.
- A custom font for icons, created with the [IcoMoon App](https://icomoon.io/app/).
At the time the font was created it was licensed
[GPLv3](http://www.gnu.org/licenses/gpl.html) or
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

## Build status
[![Build Status](https://travis-ci.org/sverweij/wordywordy.svg?branch=gh-pages)](https://travis-ci.org/sverweij/wordywordy)
[![Code Climate](https://codeclimate.com/github/sverweij/wordywordy/badges/gpa.svg)](https://codeclimate.com/github/sverweij/wordywordy)
[![Test Coverage](https://codeclimate.com/github/sverweij/wordywordy/badges/coverage.svg)](https://codeclimate.com/github/sverweij/wordywordy)
[![Dependencies](https://david-dm.org/sverweij/wordywordy.svg)](https://david-dm.org/sverweij/wordywordy)
[![devDependencies](https://david-dm.org/sverweij/wordywordy/dev-status.svg)](https://david-dm.org/sverweij/wordywordy#info=devDependencies)


## Frequently Anticipated Questions
Q: You haven't mentioned RSVP (rapid serial visual presentation) once. This _is_ RSVP, isn't it?
> A: It is Serial, and it's Presenting things. Visually. But it's only rapid when you want it to.

Q: Did you hear of ... ?
> A: Yes. Some of the options out there are excelent and seem well-researched
> and field tested.
> By all means, use them!

Q: Why did you implement this?
> A: I had a (self written) thing like this lying around when
> hunting sabre tooth tigers was all the rage. I used it for some
> time but it was hampered. By technologic restrictions (getting
> html to work in IE on windows CE was challinging). And by my
> lack of subject matter knowledge.
>
> During 2014 christmas holiday I needed a vehicle to test some
> technical stuff for [mscgen_js](https://sverweij.github.io/mscgen_js).
> This fit the bill.

Q: Do you have a road map?
> A: Kind of. Expect small things like
>  - ~~better usability on mobile devices~~
>   - ~~important/ most/ all features accessible through touch~~
>   - ~~full screen display~~
>   - possibly some other stuff I can't think of now
>  - polished bookmarklet
>  - multiple buffers
>  - icon
>  - export to gif
>  - ~~some kind of demo/ intro mode~~
>  - ~~loading files through ajax~~
>  - ~~an old-fashioned file open dialog~~
>
> I'd also like to clean up the code a bit.

Q: Do you have a time line?
> A: Not really. This thing shares time with some other projects
> ([mscgen_js](https://sverweij.github.io/mscgen_js). Work. Life).

Q: Are you afraid you'll stay the only user of this?
> A: No. On the other hand - having an FAQ on github
> could be considered awkward.
