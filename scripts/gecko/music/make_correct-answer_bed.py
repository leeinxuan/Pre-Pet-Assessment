import numpy as np
from hamlib import *
# gecko correct-answer: ukulele-like pluck strums + glockenspiel(vibe) melody + shaker, C major 128 BPM, 5 s
L=5.4; bpm=128; b=60/bpm; buf=np.zeros(int(SR*L))
C,D,E_,F,G,A,B=60,62,64,65,67,69,71
chords=[[C,E_,G],[G-12,B-12,D],[A-12,C,E_],[F-12,A-12,C]]
# strum (down-up) two per beat pair
t=0.0
for i in range(10):
    ch=chords[(i//2)%4]
    for j,m in enumerate(ch):
        put(buf, guitar(m,.9,.5), t+j*0.012)
    t+=b*.5 if i%2 else b*.5
# bass pluck on beats
for k,m in enumerate([C-24,G-24,A-24,F-24,C-24]):
    put(buf, harp(m,1.2,.55), k*2*b)
# glockenspiel melody
mel=[(E_+12,.5),(G+12,.5),(C+24,1),(B+12,.5),(G+12,.5),(A+12,1),(G+12,.5),(E_+12,.5),(D+12,.5),(E_+12,.5),(C+24,1.5)]
pos=0.0
for m,d in mel:
    if m: put(buf, vibe(m,1.0,.7), pos*b)
    pos+=d
# shaker off-beats
k=0
while k*b/2<4.6:
    put(buf, shaker(.35 if k%2==0 else .55), k*b/2); k+=1
for m in (C+12,E_+12,G+12,C+24): put(buf, vibe(m,1.8,.6), 8*b)
save('music_correct-answer.wav', reverb(buf,.3), L)
