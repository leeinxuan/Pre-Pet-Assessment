import numpy as np
from hamlib import *
# gecko busy-daily-care: lonely/bored, slow Am, soft music box + pad, 66 BPM
L=10.5; bpm=66; b=60/bpm; buf=np.zeros(int(SR*L))
C,D,E,F,G,A,B=60,62,64,65,67,69,71
put(buf, pad([A-24,E-12,A-12],10.0,.2,500), 0)
chords=[[A-12,C,E],[F-12,A-12,C],[D-12,F-12,A-12],[E-12,G-12,B-12]]
t=0.0
for bar in range(4):
    ch=chords[bar]
    for k,n in enumerate([ch[0],ch[1],ch[2]]*2):
        put(buf, harp(n,1.4,.2), t+k*b)
    t+=3*b*2/2*1.0
mel=[(E,2),(D,1),(C,3),(D,2),(E,1),(C,3)]
pos=1.0
for m,d in mel:
    put(buf, musicbox(m+12,1.8,.24), pos*b); pos+=d
save('music_busy-daily-care.wav', reverb(buf,.5), L)
