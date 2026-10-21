import numpy as np
from hamlib import *
def run(buf, inst, bpm, notes, t0=0.0, vel=0.8, rep=1):
    b = 60/bpm; pos = 0.0
    for _ in range(rep):
        for m, d in notes:
            if m is not None:
                if inst is reed: put(buf, inst(m, d*b+0.5, vel), t0+pos*b)
                else: put(buf, inst(m, max(0.3, d*b+0.8), vel), t0+pos*b)
            pos += d
def drum(buf, inst, bpm, pattern, total, vel=0.5, t0=0.0):
    b = 60/bpm; n = int(total/b*len(pattern)/len(pattern))
    k = 0
    while t0+k*b/2 < total:
        if pattern[k % len(pattern)]: put(buf, inst(vel*pattern[k % len(pattern)]), t0+k*b/2)
        k += 1
def padchords(buf, chords, bpm, beats_each, vel=0.8, t0=0.0):
    b = 60/bpm
    for i, c in enumerate(chords): put(buf, pad(c, beats_each*b*1.15, vel), t0+i*beats_each*b)
def arp(buf, inst, bpm, chords, per=8, vel=0.5, t0=0.0, step=0.5):
    b = 60/bpm; t = t0
    for c in chords:
        for i in range(per):
            put(buf, inst(c[i % len(c)], 1.6, vel), t); t += step*b
def out(name, buf, total, vol=1.0):
    save(f'music_{name}.wav', reverb(buf, 0.35), total)
C,D,E,F,G,A,B = 60,62,64,65,67,69,71
# 1 correct-answer: celesta+toypiano+shaker+harp bass, C major, ta-da
L=6.5; b=np.zeros(int(SR*L)); bpm=132
run(b, celesta, bpm, [(C+12,.5),(E+12,.5),(G+12,.5),(E+12,.5),(F+12,.5),(A+12,.5),(G+12,1),(E+12,.5),(G+12,.5),(C+24,1.5)], 0, .8)
run(b, toypiano, bpm, [(C+12,1),(None,1),(G,1),(None,1),(F,1),(None,1),(G,1)], 0, .5)
run(b, harp, bpm, [(C-12,1),(G-12,1),(C-12,1),(G-12,1),(F-12,1),(C-12,1),(G-12,1)], 0, .6)
drum(b, shaker, bpm, [1,.5,.7,.5], 4.5, .5)
for m in (C+12,E+12,G+12,C+24): put(b, celesta(m,2.5,.8), 60/bpm*8.2)
out('correct-answer', b, L)
# 2 correct-answer2: vibes+harp+woodblock G major 144
L=6.5; b=np.zeros(int(SR*L)); bpm=144
run(b, vibe, bpm, [(G,.5),(B,.5),(D+12,1),(B,.5),(D+12,.5),(G+12,1),(F+12+1,.5),(D+12,.5),(B,1),(G+12,2)], 0, .7)
run(b, harp, bpm, [(G-12,.5),(D,.5),(B,.5),(D,.5)], 0, .5, rep=4)
drum(b, woodblock, bpm, [1,0,.6,0,.8,0,.6,.5], 5, .45)
for m in (G,B,D+12,G+12): put(b, vibe(m,2.5,.7), 60/bpm*8)
out('correct-answer2', b, L)
# 3 first-day: sparse celesta + pad
L=9.5; b=np.zeros(int(SR*L)); bpm=70
padchords(b, [[C-12,G-12,E],[F-12,C,A-12]], bpm, 4, .8)
run(b, celesta, bpm, [(E+12,1.5),(G+12,.5),(D+12,2),(None,1),(C+12,1.5),(E+12,.5),(D+12,2),(None,1),(C+12,3)], 0.4, .6)
out('first-day', b, L)
# 4 sick: D minor drone + sparse vibe/musicbox
L=9.5; b=np.zeros(int(SR*L)); bpm=56
put(b, pad([50,57,62],9.5,1.2,900), 0)
run(b, vibe, bpm, [(None,2),(D+12,2),(None,1),(F+12,2),(None,2),(E+12,2),(None,1),(D+12,3)], 0, .5)
run(b, musicbox, bpm, [(None,4),(A+12,2),(None,4),(F+12,2)], 0, .35)
out('sick', b, L)
# 5 nocturnal: music-box lullaby 3/4
L=8.5; b=np.zeros(int(SR*L)); bpm=96
run(b, musicbox, bpm, [(E+12,1),(G+12,1),(E+12,1),(D+12,2),(None,1),(C+12,1),(E+12,1),(D+12,1),(C+12,3),(A,1),(C+12,1),(E+12,1),(D+12,3)], 0, .8)
put(b, pad([C-12,G-12],8.5,.7,800), 0)
out('nocturnal', b, L)
# 6 solitary: nylon guitar G major 92
L=8.7; b=np.zeros(int(SR*L)); bpm=92
for i,ch in enumerate([[G-12,D,G,B],[C,G,C+12,E+12],[D,A,D+12,F+13],[G-12,D,G,B]]):
    for j,m in enumerate(ch*2): put(b, guitar(m,1.6,.6), (i*4+j*.5)*60/bpm)
run(b, guitar, bpm, [(None,4),(B+12,1),(D+12+12,1),(B+12,1),(A+12,1),(G+12,2),(E+12,2)], 0, .6)
out('solitary', b, L)
# 7 picky: pizz + woodblock + toypiano 108
L=10; b=np.zeros(int(SR*L)); bpm=108
run(b, pluckKS, bpm, [(C,.5),(None,.5),(E,.5),(None,.5),(G,.5),(None,.5),(E,.5),(None,.5)], 0, .5, rep=5) if False else None
for k in range(10):
    for i,m in enumerate([C-12,G-12,E-12,G-12]): put(b, harp(m,.6,.55), (k*4+i)*60/bpm*.5*1.0)
drum(b, woodblock, bpm, [1,0,.5,.6], 9, .4)
run(b, toypiano, bpm, [(E+12,.5),(None,.5),(G+12,.5),(E+12,.5),(D+12,1),(None,1),(C+12,.5),(D+12,.5),(E+12,1),(G+12,2),(None,1)], 0, .6, rep=2)
out('picky-eating', b, L)
# 8 arrival: harp arpeggio + celesta melody + pad 88 (aligned to start)
L=13.5; b=np.zeros(int(SR*L)); bpm=88
chs=[[C,E,G,C+12],[A-12,C,E,A],[F-12,A-12,C,F],[G-12,B-12,D,G]]
arp(b, harp, bpm, chs*2, 8, .5)
padchords(b, [[C-12,G-12],[A-24,E-12],[F-12,C],[G-12,D]]*2, bpm, 4, .8)
run(b, celesta, bpm, [(E+12,1),(G+12,1),(C+24,2),(A+12,1),(G+12,1),(E+12,2),(F+12,1),(A+12,1),(G+12,2),(D+12,2),(None,2)], 0, .7)
out('arrival-transition', b, L)
# 9 busy day: vibe + harp + pad wistful 80
L=14.5; b=np.zeros(int(SR*L)); bpm=80
chs=[[A-12,E,A,C+12],[F-12,C,F,A],[C,G,C+12,E+12],[G-12,D,G,B]]
arp(b, harp, bpm, chs*2, 8, .45)
padchords(b, [[A-24,E-12,C],[F-12,A-12,C],[C-12,G-12,E],[G-24,D-12,B-12]]*2, bpm, 4, .8)
run(b, vibe, bpm, [(E+12,2),(D+12,1),(C+12,1),(E+12,2),(F+12,2),(E+12,3),(D+12,1),(C+12,4)], 0, .55, rep=2)
out('busy-day-transition', b, L)
# 10 aging: music box + celesta, lively then slower
L=12; b=np.zeros(int(SR*L)); bpm=120
run(b, musicbox, bpm, [(C+12,.5),(E+12,.5),(G+12,.5),(E+12,.5),(D+12,.5),(F+12,.5),(A+12,.5),(F+12,.5),(E+12,1),(C+12,1)], 0, .7)
bpm2=76; t0=5.0
run(b, celesta, bpm2, [(A,1),(C+12,1),(E+12,2),(D+12,1),(C+12,1),(A,2),(G,3)], t0, .65)
put(b, pad([A-12,E-12,C],7,.9,900), t0-.5)
out('time-passes-aging', b, L)
# 11 daily care: harmonica + pad A minor 58
L=11.5; b=np.zeros(int(SR*L)); bpm=58
padchords(b, [[A-24,E-12,C],[F-24,C-12,A-12],[D-12,A-12,F],[E-12,B-12,G+1]], bpm, 4, .9)
run(b, reed, bpm, [(None,2),(E+12,2),(D+12,1),(C+12,1),(B,2),(A,3),(None,1),(C+12,2),(E+12,2)], 0, .6)
out('busy-daily-care', b, L)
# 12 senior: harp + soft flute-ish pad F major 64
L=11; b=np.zeros(int(SR*L)); bpm=64
chs=[[F-12,C,F,A],[A-12,E,A,C+12],[Bb:=70-12,F,Bb+12,D+12],[C,G,C+12,E+12]]
arp(b, harp, bpm, chs*2, 8, .5, step=.5)
padchords(b, [[F-12,C],[A-12,E],[70-12,F],[C-12,G-12]]*2, bpm, 4, 1.0, 0)
run(b, reed, bpm, [(A+12,3),(G+12,1),(F+12,2),(E+12,2),(F+12,3),(C+12,1),(F+12,4)], .5, .4)
out('senior-life', b, L)
