import numpy as np
from hamlib import *
# gecko arrival-transition: warm C major, gentle guitar arpeggio + vibe melody + woodblock tick, 88 BPM, 12 s
L=13.6; bpm=88; b=60/bpm; buf=np.zeros(int(SR*L))
C,D,E,F,G,A,B=60,62,64,65,67,69,71
put(buf, pad([C-12,G-12,E],11.8,.22,600), 0)
chords=[[C,E,G],[A-12+12,C+12,E],[F,A,C+12],[G,B,D+12]]
t=0.0
for bar in range(7):
    ch=chords[bar%4]
    for k,n in enumerate([ch[0],ch[1],ch[2],ch[1]]*2):
        put(buf, guitar(n-12,1.0,.26), t+k*b/2)
    t+=4*b*0.5*2/2*1.0 if False else 4*b
mel=[(E,1),(G,1),(A,2),(G,1),(E,1),(D,2),(E,1),(G,1),(C+12,2),(B,1),(G,1),(E,2),(G,2),(E,2),(C,4)]
pos=1.5
for m,d in mel:
    put(buf, vibe(m+12 if m<C+12 else m,1.6,.3), pos*b); pos+=d
for k in range(int(L/b)):
    if k%2==1: put(buf, woodblock(.12), k*b)
save('music_arrival-transition.wav', reverb(buf,.4), L)
