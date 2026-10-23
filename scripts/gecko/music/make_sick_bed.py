import numpy as np
from hamlib import *
# gecko sick: slow minor, soft reed + low pad, 46 BPM, 8.6 s
L=8.6; bpm=46; b=60/bpm; buf=np.zeros(int(SR*L))
A,C,E_,G,F,D=57,60,64,67,65,62
put(buf, pad([A-24+12,E_-12,C],8.4,.3,500), 0)
mel=[(E_+0,2.5),(D,1.5),(C,2.5),(A-12+12,3)]
pos=0.0
for m,d in mel:
    put(buf, reed(m,2.4,.35,0.005), pos*b); pos+=d
put(buf, harp(A-12,3.0,.2), 0); put(buf, harp(F-12,3.0,.2), 3*b)
save('music_sick.wav', reverb(buf,.5), L)
