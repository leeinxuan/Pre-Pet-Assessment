# Subdued lonely solo piano + faint wall-clock tick for busy-daily-care (A minor, sparse, slow)
import numpy as np
from scipy.io import wavfile
from scipy.signal import fftconvolve, butter, lfilter
SR=44100; DUR=10.2
rng=np.random.default_rng(5)
out=np.zeros((int(SR*DUR),2))
def hz(m): return 440*2**((m-69)/12)
def note(m,t0,dur,vel,pan=0.5):
    f=hz(m); n=int(SR*dur); t=np.arange(n)/SR
    tau=1.0+(84-m)*0.05
    s=np.zeros(n)
    for k,a in enumerate([1,.5,.28,.14,.08,.05],start=1):
        s+=a*np.sin(2*np.pi*f*k*(1+0.0003*k*k)*t+rng.uniform(0,6))*np.exp(-t*(k*0.35)/tau*1.4)
    s*=np.minimum(t/0.008,1)*np.exp(-t/tau)*vel
    b,a=butter(2,2400/(SR/2)); s=lfilter(b,a,s)
    i=int(t0*SR); e=min(len(out),i+n)
    out[i:e,0]+=s[:e-i]*(1-pan); out[i:e,1]+=s[:e-i]*pan
# lonely melody
for t,m,v in [(0.3,57,.5),(1.9,60,.4),(3.4,64,.4),(4.6,62,.36),(5.8,57,.36),(7.0,55,.34),(8.2,52,.34)]:
    note(m,t,4.0,v,0.45)
for t,ms in [(4.0,[45,52]),(8.0,[41,48])]:
    for j,m in enumerate(ms): note(m,t+j*0.08,4.0,.3,0.5)
# faint clock tick, 1 per second
for k in range(0):  # tick removed (typing SFX now plays first; no synthetic clock)
    n=int(SR*0.03); t=np.arange(n)/SR
    tick=rng.standard_normal(n)*np.exp(-t/0.004)*0.03
    b,a=butter(2,[1500/(SR/2),5000/(SR/2)],btype='band'); tick=lfilter(b,a,tick)
    i=int((0.5+k)*SR); out[i:i+n,0]+=tick; out[i:i+n,1]+=tick
ir=rng.standard_normal((int(SR*2.2),2))*np.exp(-np.arange(int(SR*2.2))/SR/0.6)[:,None]
wet=np.stack([fftconvolve(out[:,c],ir[:,c])[:len(out)] for c in (0,1)],1)
y=out*0.75+wet*0.08
y*=np.minimum(1,(DUR-np.arange(len(y))/SR)/1.2)[:,None]; y/=np.abs(y).max()/0.8
wavfile.write('scripts/rabbit/music/care-bed.wav',SR,(y*32767).astype(np.int16))
