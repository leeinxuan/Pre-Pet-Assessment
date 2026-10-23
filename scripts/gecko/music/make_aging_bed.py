import numpy as np
from hamlib import *
# gecko time-passes-aging: nostalgic 3/4 waltz; music box + pad + harp. Steady 72 BPM, then slows (ritardando) from ~6.2 s to match the senior gecko shot.
L=12.8; buf=np.zeros(int(SR*L))
C,D,E,F,G,A,B=60,62,64,65,67,69,71
# beat grid with ritardando
bt=[0.0]; t=0.0; i=0
while t<80:
    bpm=72 if t<6.0 else max(40,72-(t-6.0)*7.5)
    t+=60/bpm; bt.append(t); i+=1
def at(beat): # beat may be fractional
    k=int(beat); f=beat-k
    return bt[k]+(bt[k+1]-bt[k])*f
put(buf, pad([C-12,G-12,E],11.8,.2,500), 0)
chords=[[C,E,G],[A-12,C,E],[F-12,A-12,C],[G-12,B-12,D]]
bar=0; beat=0
while at(beat)<L-1.0:
    ch=chords[bar%4]
    for k,n in enumerate([ch[0]-12,ch[1],ch[2]]*2):
        tt=at(beat+k/2)
        if tt<L-0.8: put(buf, harp(n,1.6,.22), tt)
    bar+=1; beat+=3
mel=[(E,2),(G,1),(A,3),(G,2),(E,1),(D,3),(E,2),(G,1),(C+12,3),(B,2),(A,1),(G,3),(E,4)]
pos=1.0
for m,d in mel:
    tt=at(pos)
    if tt<L-1.2: put(buf, musicbox(m+12,2.0,.3), tt)
    pos+=d
save('music_time-passes-aging.wav', reverb(buf,.5), L)
print('beats to 10.6s:', sum(1 for x in bt if x<10.6))
