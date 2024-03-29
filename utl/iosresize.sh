#!/bin/sh
SIZE=$(expr "$2" : "[^-]*-\(.*\).png")
CONVERT=$(which convert)
OPTIPNG=$(which optipng)
# convert $1  -bordercolor white -border 0 \
if [ "$CONVERT" ]
then
    $CONVERT "$1" -bordercolor white -border 0 \( -clone 0 -resize "$SIZE"x"$SIZE" \) -delete 0 -alpha off "$2"
fi

if [ "$OPTIPNG" ]
then
    $OPTIPNG -quiet "$2"
fi
