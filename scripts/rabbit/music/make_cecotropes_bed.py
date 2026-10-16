# Playful pizzicato/marimba bounce for cecotropes (C major, ~112 bpm, similar feel to cat climbing.mp4). Run from repo root.
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, lfilter, fftconvolve
SR=44100; DUR=10.0; BPM=112; B=60/BPM
rng=np.random.default_rng(5)
out=np.zeros((int(SR*DUR),2))
def hz(m): return 440*2**((m-69)/12)
def put(s,t0,pan=0.5):
    i=int(t0*SR)
    if i>=len(out): return
    e=min(len(out),i+len(s)); s=s[:e-i]
    out[i:e,0]+=s*(1-pan); out[i:e,1]+=s*pan
def marimba(m,dur=0.5,vel=1.0):
    f=hz(m); n=int(SR*dur); t=np.arange(n)/SR
    s=np.sin(2*np.pi*f*t)*np.exp(-t/0.16)+0.35*np.sin(2*np.pi*f*4*t)*np.exp(-t/0.05)+0.15*np.sin(2*np.pi*f*10*t)*np.exp(-t/0.02)
    return s*np.minimum(t/0.003,1)*vel
def pluck(m,dur=0.35,vel=1.0):   # pizzicato-ish / bass pluck
    f=hz(m); n=int(SR*dur); t=np.arange(n)/SR
    s=np.zeros(n)
    for k,a in enumerate([1,.6,.35,.2,.1],start=1): s+=a*np.sin(2*np.pi*f*k*t)*np.exp(-t*(7+k*5))
    return s*vel
def shaker(vel=1.0):
    n=int(SR*0.07); t=np.arange(n)/SR
    b,a=butter(2,[5000/(SR/2),12000/(SR/2)],'band')
    return lfilter(b,a,rng.standard_normal(n))*np.exp(-t/0.02)*vel
# progression C | Am | F | G (each 4 beats = 2.14 s), ~4.7 bars in 10 s
bars=[(0,[48,55,52]),(1,[45,52,48]),(2,[41,48,45]),(3,[43,50,47])]
chord_notes={0:[60,64,67,72],1:[57,60,64,69],2:[57,60,65,69],3:[59,62,67,71]}
melody=[ # (beat, midi) per 4-bar-ish loop, playful hops
 (0,76),(0.5,79),(1,76),(1.5,72),(2,74),(3,72),
 (4,69),(4.5,72),(5,76),(5.5,72),(6,69),(7,71),
 (8,72),(8.5,77),(9,76),(9.5,72),(10,69),(11,72),
 (12,74),(12.5,71),(13,67),(13.5,71),(14,74),(15,79)]
nb=int(DUR/B)+1
for bar in range(0,nb//4+1):
    c=bar%4; t0=bar*4*B
    root=chord_notes[c][0]-12
    for beat,m in [(0,root),(2,root+7),(3,root+12)]:
        put(pluck(m,0.4,0.55),t0+beat*B,0.45)
    for beat in (1,3):   # offbeat chord stabs
        for m in chord_notes[c][1:3]: put(pluck(m,0.25,0.22),t0+(beat+0.5)*B,0.55)
    for k in range(8): put(shaker(0.10 if k%2 else 0.06),t0+k*B/2,0.5)
loop=len(melody) and 16
for bar in range(0,int(nb/16)+2):
    for beat,m in melody:
        tt=(bar*16+beat)*B
        if tt<DUR-0.2: put(marimba(m,0.5,0.42),tt,0.6)
ir=rng.standard_normal((int(SR*1.0),2))*np.exp(-np.arange(int(SR*1.0))/SR/0.25)[:,None]
wet=np.stack([fftconvolve(out[:,c],ir[:,c])[:len(out)] for c in (0,1)],1)
y=out*0.85+wet*0.08
y*=np.minimum(1,(DUR-np.arange(len(y))/SR)/1.0)[:,None]
y*=np.minimum(1,np.arange(len(y))/SR/0.3)[:,None]
y/=np.abs(y).max()/0.8
wavfile.write('scripts/rabbit/music/cecotropes-bed.wav',SR,(y*32767).astype(np.int16))
