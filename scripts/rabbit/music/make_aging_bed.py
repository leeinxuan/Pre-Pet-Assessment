# Piano bed for time-passes-aging: playful bouncy (C major, staccato) -> slow nostalgic (A minor, soft)
import numpy as np
from scipy.io import wavfile
from scipy.signal import fftconvolve, butter, lfilter
SR=44100; DUR=10.5
rng=np.random.default_rng(11)
out=np.zeros((int(SR*DUR),2))
def hz(m): return 440*2**((m-69)/12)
def note(m,t0,dur,vel,pan=0.5,decay=1.0):
    f=hz(m); n=int(SR*dur); t=np.arange(n)/SR
    tau=(0.9+(84-m)*0.05)*decay
    s=np.zeros(n)
    for k,a in enumerate([1,.5,.28,.14,.08,.05],start=1):
        s+=a*np.sin(2*np.pi*f*k*(1+0.0003*k*k)*t+rng.uniform(0,6))*np.exp(-t*(k*0.35)/tau*1.4)
    s*=np.minimum(t/0.006,1)*np.exp(-t/tau)*vel
    b,a=butter(2,3200/(SR/2)); s=lfilter(b,a,s)
    i=int(t0*SR); e=min(len(out),i+n)
    out[i:e,0]+=s[:e-i]*(1-pan); out[i:e,1]+=s[:e-i]*pan
# playful 0-5.5s: bouncy C-G-Am-F pattern, short notes, eighth-note feel (~0.25s)
mel=[72,76,79,76,72,76,79,84, 71,74,79,74,71,74,79,83, 69,72,76,72,69,72,76,81, 65,69,72,69,65,69,72,77]
for i,m in enumerate(mel):
    t=0.1+i*0.17
    if t>5.4: break
    note(m,t,0.9,0.34 if i%4 else 0.42,0.3+0.4*((i%8)/8),decay=0.5)
for t,m in [(0.1,48),(1.5,43),(2.9,45),(4.3,41)]: note(m,t,1.6,0.35,0.5,decay=0.8)
# nostalgic 5.6-10s: slow A minor chords + sparse melody
for t,ms in [(5.6,[45,57,64,69]),(7.4,[41,57,65,69]),(9.0,[45,52,60,64])]:
    for j,m in enumerate(ms): note(m,t+j*0.09,3.2,0.34,0.5,decay=1.3)
for t,m in [(6.0,76),(7.0,72),(7.8,74),(9.1,69)]: note(m,t,3.0,0.3,0.55,decay=1.3)
ir=rng.standard_normal((int(SR*2.2),2))*np.exp(-np.arange(int(SR*2.2))/SR/0.6)[:,None]
wet=np.stack([fftconvolve(out[:,c],ir[:,c])[:len(out)] for c in (0,1)],1)
y=out*0.75+wet*0.07
y*=np.minimum(1,(DUR-np.arange(len(y))/SR)/1.2)[:,None]; y/=np.abs(y).max()/0.8
wavfile.write('scripts/rabbit/music/aging-bed.wav',SR,(y*32767).astype(np.int16))
