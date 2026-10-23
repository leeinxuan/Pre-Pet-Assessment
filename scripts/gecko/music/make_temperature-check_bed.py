import numpy as np
from hamlib import *
# gecko temperature-check: cold, sparse single-note glock/vibes + thin pad, D minor-ish, 50 BPM, 8.6 s
L=8.6; bpm=50; b=60/bpm; buf=np.zeros(int(SR*L))
D,E_,F,G,A,Bb,C=62,64,65,67,69,70,72
put(buf, pad([D-12,A-12,F],8.4,.35,600), 0)
mel=[(None,.8),(A+12,2),(F+12,2),(None,.5),(E_+12,2),(D+12,3)]
pos=0.0
for m,d in mel:
    if m: put(buf, celesta(m,2.6,.5), pos*b)
    pos+=d
for k,m in enumerate([D-12,Bb-12]):
    put(buf, harp(m,3.0,.25), k*3*b)
save('music_temperature-check.wav', reverb(buf,.5), L)
