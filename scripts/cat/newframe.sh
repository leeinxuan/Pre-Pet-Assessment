#!/bin/bash
# usage: newframe.sh NAME  -> takes newest PNG in ~/Downloads, saves start-frames/NAME.orig.png and NAME.png (1280x720)
D=$HOME/mnt/Downloads; S=$HOME/mnt/Pre-Pet-Assessment/scripts/cat/start-frames
f=$(ls -t "$D"/*.png | head -1)
cp "$f" "$S/$1.orig.png"
ffmpeg -v error -y -i "$S/$1.orig.png" -vf "crop=1536:864,scale=1280:720" "$S/$1.png"
echo "$f -> $S/$1.png"
