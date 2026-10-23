import numpy as np
from hamlib import *
# gecko sick-walk: unsteady, sparse toy-piano/woodblock wobble over thin pad, D minor, 54 BPM, 8.6 s
L=8.6; bpm=54; b=60/bpm; buf=np.zeros(int(SR*L))
D,F,A,Bb,C,E_=62,65,69,70,72,64
put(buf, pad([D-12,A-12,F],8.4,.25,550), 0)
steps=[(1.0,A),(1.7,F),(2.6,A+0),(3.2,Bb),(4.2,A),(4.7,F),(5.8,E_),(7.0,D)]
for t,m in steps: put(buf, toypiano(m+0,0.8,.4), t)
for t in [1.2,2.1,3.0,3.7,4.5]: put(buf, woodblock(.12), t)
put(buf, reed(D,3.0,.25,0.006), 5.0)
save('music_sick-walk.wav', reverb(buf,.45), L)
