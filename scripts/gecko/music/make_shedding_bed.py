import numpy as np
from hamlib import *
# gecko shedding: gentle wooden guitar, warm evening, G major-ish, 66 BPM, 8.6 s
L=8.6; bpm=66; b=60/bpm; buf=np.zeros(int(SR*L))
G,A,B,C,D,E_=55,57,59,60,62,64
put(buf, pad([G-12,D-12+12,B-12+12],8.4,.22,700), 0)
arp=[G,B,D+12,B,E_,B+0,D+12,B]
for i,m in enumerate(arp*2):
    t=i*b*0.5
    if t<L-1.5: put(buf, guitar(m+12 if i%4 else m,1.6,.45), t)
for k,m in enumerate([G-12,E_-12,C-12,D-12]):
    put(buf, guitar(m+12,2.0,.4), k*2*b)
put(buf, woodblock(.15), 4*b); put(buf, woodblock(.12), 6*b)
save('music_shedding.wav', reverb(buf,.35), L)
