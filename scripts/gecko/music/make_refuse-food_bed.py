import numpy as np
from hamlib import *
# gecko refuse-food: slow, soft, slightly wistful (A minor, 54 BPM), 8.6 s; sparse notes, no tension
L=8.6; bpm=54; b=60/bpm; buf=np.zeros(int(SR*L))
A,B,C,D,E_,F,G=57,59,60,62,64,65,67
put(buf, pad([A-12,E_-12,C,E_],8.4,.5,700), 0)
mel=[(None,1),(E_+12,1.5),(D+12,1),(C+12,1.5),(None,.5),(B,1.5),(A,3)]
pos=0.0
for m,d in mel:
    if m: put(buf, musicbox(m,2.4,.5), pos*b)
    pos+=d
for k,m in enumerate([A-12,F-12,C-12,G-12]):
    put(buf, harp(m,2.4,.3), k*2*b)
save('music_refuse-food.wav', reverb(buf,.45), L)
