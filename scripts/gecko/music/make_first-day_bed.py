import numpy as np
from hamlib import *
# gecko first-day: sparse soft harp/music-box notes + faint pad, C major, 66 BPM, 8.4 s
L=8.6; bpm=66; b=60/bpm; buf=np.zeros(int(SR*L))
C,D,E_,F,G,A,B=60,62,64,65,67,69,71
put(buf, pad([C-12,G-12,E_],8.4,.6,800), 0)
mel=[(None,1),(E_+12,1.5),(G+12,.5),(D+12,2),(None,1),(C+12,1.5),(E_+12,.5),(D+12,1),(None,.5),(G,2),(C+12,3)]
pos=0.0
for m,d in mel:
    if m: put(buf, musicbox(m,2.0,.55), pos*b)
    pos+=d
for k,m in enumerate([C-12,G-12,A-12,F-12]):
    put(buf, harp(m,2.0,.35), k*2*b)
save('music_first-day.wav', reverb(buf,.4), L)
