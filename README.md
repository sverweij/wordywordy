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
You'll figure this out in a pinch. Probably without even having checked this table. Trust me.

When you do this | This will happen
---------------- | ----------------
press `SPACE` or `ENTER` | play/ pause
press `UP` or `W` | faster by 5 words per minute
press `DOWN` or `S` | slower by 5 words per minute
press `RIGHT` or `D` | next word. If playing: pause.
press `LEFT` or `A` | previous word. If playing: pause.
press `PAGEUP` or `E` | end of sentence. If playing: pause.
press `PAGEDOWN` or `Q` | start of sentence. If playing: pause. 
press`B` | saves current position (note: also automatically happens on pause)
press `1` .. `0` | selects a theme
click on the right side of the screen | play/ pause
click on the left side of the screen | start of sentence. If playing: continue playing
click on the top of the screen | faster by 5 words per minute
click on the bottom of the screen | slower by 5 words per minute
click on the progress bar | go to that position in the text
`scroll` | scroll through the text 
press `,` or `.` | shows/ hides stats on the current session
press `t` | shows time left

## Bookmarklet
There is a [bookmarklet](bookmarklet.js). It works. It's not yet perfect.

## URL parameters
(Skip this if you don't know what these are - you won't miss anything)
speed - number in words per minute. Minimum 60 - maximum 600.
pos - a number representing the position (word) to start reading.
text - url/ uri encoded text to read. When left out it'll start reading from the latest 
theme - a number between 0 and 12 - each of which represents a theme
play - 1 or 0 - if this parameter equals `1`, the text will automatically start playing, about a second after it was  loaded.

Example: 
```
https://sverweij.github.io/wordywordy/index.html?speed=200&theme=5&pos=0&play=1&text=This reads some text to you at about 200 words per minute. The text is presented in the open dyslexic font with a sepia color scheme. 
```

## Roadmap?
Yes. There is one. I'll pasted it here when it is legible :-)

## A word on speeds
The speed you selected is the _target_ speed. It is a good indication of the actual speed. 
However, the actual speed depends on the type of text. 

I have chosen to not follow the standard to count 5 letters as a word, which feels like 
cheating.

## Licenses and dependencies
WordyWordy is free software [licensed under GPLv3](LICENSE). This means (a.o.) you *can* use
it as part of other free software. You can *not* use it as part of non free software.

WordyWordy uses two non-standard fonts:
- Roboto (from Google's Android). Roboto-thin came out hands-down as the easiest to read.
- [Open Dyslexic](https://github.com/antijingoist/open-dyslexic). Used in the dyslexic themes. 
I hope it improves usability for dyslexic people.

