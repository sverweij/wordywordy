#!/bin/sh
convert $1 -resize 20% -gaussian-blur 27x9 $1.tmp
jpegtran -optimize -progressive -copy none $1.tmp > $2
rm -f $1.tmp
