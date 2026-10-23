import numpy as np
from hamlib import *
# gecko correct-answer2: playful pizzicato (harp/guitar) + toy piano melody + woodblock, F major 136 BPM, 5 s
L=5.4; bpm=136; b=60/bpm; buf=np.zeros(int(SR*L))
F,G,A,Bb,C,D,E_=65,67,69,70,72,74,76
# bouncy bass: F C F C Bb F C F
for k,m in enumerate([F-24,C-24,F-24,C-24,Bb-24,F-24,C-24,F-24,F-24]):
    put(buf, harp(m,.8,.6), k*b)
# off-beat guitar chords
for k in range(9):
    for m in ([F-12,A-12,C],[C-12,E_-12,G-12]) [k%2 if k%4<2 else 0]:
        put(buf, guitar(m,.5,.38), k*b+b*.5)
# toy piano melody (hops)
mel=[(A,.5),(C+12,.5),(F+12,.5),(None,.5),(E_+12,.5),(C+12,.5),(D+12,1),(Bb,.5),(D+12,.5),(C+12,.5),(A,.5),(G,.5),(A,.5),(F+12,1.5)]
pos=0.0
for m,d in mel:
    if m: put(buf, toypiano(m,.6,.75), pos*b)
    pos+=d
# woodblock ticks
k=0
while k*b/2<4.7:
    if k%4 in (0,3): put(buf, woodblock(.5), k*b/2)
    k+=1
for m in (F,A,C+12,F+12): put(buf, toypiano(m,1.8,.6), 8*b)
save('music_correct-answer2.wav', reverb(buf,.28), L)
