#!/bin/bash
# usage: newclip.sh NAME -> newest ~/Downloads/*.mp4 -> pet-journey/clips/NAME.mp4 + contact sheet start-frames/_cs_NAME.png
D=$HOME/mnt/Downloads; C=$HOME/mnt/Pre-Pet-Assessment/public/assets/cat/pet-journey/clips
f=$(ls -t "$D"/*.mp4 | head -1)
cp "$f" "$C/$1.mp4"
ffmpeg -v error -y -i "$C/$1.mp4" -vf "fps=1,scale=240:-1,tile=4x2" -frames:v 1 "$HOME/mnt/Pre-Pet-Assessment/scripts/cat/start-frames/_cs_$1.png"
ffprobe -v error -show_entries format=duration -of csv=p=0 "$C/$1.mp4"
