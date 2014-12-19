# WordyWordy
*Read text. One word at a time.*

WordyWordy takes text that's dropped on it and shows it. One word at a time. As fast as you want. Or as slow. 

## Why and for whom?
**Faster**.
  It is possible to read _faster_ with this kind of text display. Faster then
  reading from conventional text display (i.e. books) anyway. Research shows it
  is possible to read comfortably up to 400 words per minute. Anything faster
  will hamper understanding.
  
**Bigger**. 
  You can show words stupid big when you only display one of them at the time. 
  Might be useful for visualy-impaired people. I use it during fitness exercises.
  
**Slower**.
  The speed can be adjusted to show about 1 word per second. It's also possible to 
  step through the text manually (using the arrow keys).
  
**Dyslexics**.
  I've read claims that presenting text this way helps people dyslexia. It might 
  be true for some types. I don't know. I have included a font designed for 
  people with dyslexia, just in case it does. They're under keys `6`, `7`, `8` and `9`.


TODO: add links to claims & research

## Screenshot!
TODO: animated gif here.

## Features
- Adjustable speed. On the fly.
- Adjustable theme to match your taste or need:
  - Sepia/ Day/ Night
  - Night low contrast
  - High contrast (yellow on black, fat letters)
  - Regular and dyslexic friendly fonts.
- It proportionally pauses on punctuation and paragraphs. So your brain can too.
- It remembers your last text. And where you left of in it. (Provided you don't clear your browser's local storage).
- Forward/ backward navigation with mouse and/ or keys. On the fly.
- Supports Chinese/ Japanes/ Korean (there is a reason 字 means translates to _character_, but also to _word_)
- Heuristics for correcting common typographic errors in source texts.
- Reading stats for your current session.

- It smiles to you. (Go on, drag something on it. You'll see).

## Keyboard and mouse bindings
You'll figure this out in a pinch. Probably without even checking this table. Trust me.

When you want this         |  keyboard                        | mouse        
-------------------------- | -------------------------------- | ---------------------------------
pause/ play                | `SPACE` or `ENTER`               | click the _right_ of the screen
go slower                  | `DOWN` or `s`                    | click the _bottom_ of the screen
go faster                  | `UP` or `w`                      | click the _top_ of the screen
go back a word             | `LEFT` or `a`                    | scroll down
go back a sentence         | `PAGEDOWN` or `q`                | click the _left_ of the screen
go forward a word          | `RIGHT` or `d`                   | scroll up
go forward a sentence      | `PAGEDOWN` or `Q`                | -
change Theme               | `1`, `2`, ..., `9`, `0`          | -
show amount of time left   | `t`                              | - 
show stats                 | `.` or `,`                       | - 
save current position      | `b`                              | - 
jump to position           | not implemented yet              | click on the progress bar on the bottom of the screen and WordyWordy will go there. |

- @scrolling: effect depends a bit on your mouse/ track pad. 
- @themes: `1`-`5` are the regular themes (with _high contrast_ on `5`),`6-9` the  dyslexic ones
- @save current position: pausing or navigating automatically save the position. Heck, it even magically saves _speed_ and _theme_ along with the _position_.
  Hit `b` when you don't trust that. Or when you don't pause or navigate.

## Bookmarklet
There is a [bookmarklet](bookmarklet.js). It works. It's not yet perfect.

## URL parameters
(Skip this if you don't know what an URL parameter is - you won't miss anything)

parameter | 'splanation
--------- | -----------------
speed     | A `number` between 60 and 600 words per minute. When WordyWordy doesn't understand, it'll pick a default speed (300 wpm).
pos       | A number representing the position (word) to start reading. When WordyWordy doesn't understand, it will start at position 0.
text      | Text to read. Expected to be URI encoded. When left out WordyWordy will start reading from the latest text you left last time your started it.
theme     | a number between 0 and 12 - each of which represents a theme. 
play      | 1 or 0 - if this parameter equals `1`, the text will automatically start playing, about a second after it was  loaded.

Example: 
```
https://sverweij.github.io/wordywordy/index.html?speed=200&theme=5&pos=0&play=1&text=This reads some text to you at about 200 words per minute. The text is presented in the open dyslexic font with a sepia color scheme. 
```

## Roadmap?
Yes. There is one. I'll share when it is legible.

## A word on speeds
The speed you selected is the _target_ speed. It is a good indication of the actual speed. 
However, the actual speed depends on the type of text. 

I have chosen to not follow the standard to count each 5 letters as a word. It feels like 
cheating.

## Licenses and dependencies
WordyWordy is free software [licensed under GPLv3](LICENSE). This means (a.o.) you *can* use
it as part of other free software. You can *not* use it as part of non free software.

WordyWordy uses two non-standard fonts:
- **Roboto** (from Google's Android). Roboto-thin came out hands-down as the easiest to read.
- **[Open Dyslexic](https://github.com/antijingoist/open-dyslexic)**. Used in the dyslexic themes. 
I hope it improves usability for dyslexic people.
