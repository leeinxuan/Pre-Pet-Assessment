import numpy as np
from hamlib import *
# gecko senior-life: gentle, tender, warm (C -> F -> G -> C), music box + harp + soft pad, 70 BPM
L=9.4; bpm=70; b=60/bpm; buf=np.zeros(int(SR*L))
C,D,E,F,G,A,B=60,62,64,65,67,69,71
put(buf, pad([C-24,G-12,E-12],9.0,.2,550), 0)
chords=[[C-12,E-12,G-12],[F-12,A-12,C],[A-12,C,E],[G-12,B-12,D]]
t=0.0
for bar in range(4):
    ch=chords[bar]
    for k,n in enumerate([ch[0],ch[1],ch[2],ch[1]]*2):
        put(buf, harp(n,1.4,.2), t+k*b/2)
    t+=4*b
mel=[(G,2),(E,1),(G,2),(A,1),(G,3),(E,1),(D,2),(E,2),(C+12,4)]
pos=1.0
for m,d in mel:
    put(buf, musicbox(m+12 if m<72 else m,1.8,.24), pos*b); pos+=d
save('music_senior-life.wav', reverb(buf,.5), L)
