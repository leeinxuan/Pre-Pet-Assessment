import numpy as np
from hamlib import *
# gecko sick (combined lying + shaky-leg walk): slow D minor, soft reed over low pad, sparse toy-piano wobble in 2nd half, 50 BPM, 12.5 s
L=12.5; bpm=50; b=60/bpm; buf=np.zeros(int(SR*L))
D,E_,F,G,A,Bb,C=62,64,65,67,69,70,72
put(buf, pad([D-12,A-12,F],12.3,.28,520), 0)
mel=[(A,2.5),(F,1.5),(E_,2.5),(D,3.0),(F,1.5),(E_,2.0),(D,3.0)]
pos=0.0
for m,d in mel:
    put(buf, reed(m,2.4,.32,0.005), pos*b); pos+=d
put(buf, harp(D-12,3.0,.2), 0); put(buf, harp(Bb-12,3.0,.2), 3*b)
for t in [5.0,5.9,7.0,7.8,8.9]: put(buf, toypiano(A-12+ (3 if t>7 else 0),0.7,.3), t)
for t in [5.4,6.5,7.4,8.4]: put(buf, woodblock(.1), t)
save('music_sick_full.wav', reverb(buf,.5), L)
