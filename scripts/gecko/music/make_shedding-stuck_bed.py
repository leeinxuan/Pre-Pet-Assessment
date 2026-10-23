import numpy as np
from hamlib import *
# gecko stuck shed: soft wooden guitar, slightly uneasy E minor, 58 BPM, 8.6 s
L=8.6; bpm=58; b=60/bpm; buf=np.zeros(int(SR*L))
E_,G,B,A,D,C=52,55,59,57,62,60
put(buf, pad([E_-12+12,B-12+12,G],8.4,.2,650), 0)
arp=[E_,B,G+12,B,A,B,C+12,B]
for i,m in enumerate(arp*2):
    t=i*b*0.5
    if t<L-1.5: put(buf, guitar(m+12,1.6,.4), t)
for k,m in enumerate([E_,C,A,B]):
    put(buf, guitar(m,2.0,.4), k*2*b)
put(buf, woodblock(.12), 5*b)
save('music_shedding-stuck.wav', reverb(buf,.35), L)
