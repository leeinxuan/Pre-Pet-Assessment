import numpy as np
from hamlib import *
# gecko busy-day-transition: wistful (Am) -> warm (C), soft guitar arpeggio + vibe melody, 80 BPM
L=15.0; bpm=80; b=60/bpm; buf=np.zeros(int(SR*L))
C,D,E,F,G,A,B=60,62,64,65,67,69,71
put(buf, pad([A-24,E-12,A-12],11.8,.2,500), 0)
put(buf, pad([C-12,G-12,E-12],5.0,.2,600), 8.4)
chords=[[A-12,C,E],[F-12,A-12,C],[C,E,G],[G-12,B-12,D]]
t=0.0
for bar in range(6):
    ch=chords[bar%4] if bar<4 else chords[[2,3][bar-4]]
    for k,n in enumerate([ch[0],ch[1],ch[2],ch[1]]*2):
        put(buf, guitar(n,1.0,.24), t+k*b/2)
    t+=4*b
mel=[(E,2),(D,1),(C,1),(D,2),(E,2),(G,3),(E,1),(D,2),(C,2),(E,2),(G,4)]
pos=2.0
for m,d in mel:
    put(buf, vibe(m+12,1.8,.26), pos*b); pos+=d
for k in range(int(L/b)):
    if k%4==2: put(buf, woodblock(.1), k*b)
save('music_busy-day-transition.wav', reverb(buf,.45), L)
