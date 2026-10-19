# Warm homecoming bed for busy-day-transition (G major, fingerpicked nylon-ish plucks + soft strings). Starts right after the typing intro.
import numpy as np
from scipy.io import wavfile
from scipy.signal import fftconvolve, butter, lfilter
SR=44100; DUR=9.0; BPM=76; B=60/BPM
rng=np.random.default_rng(71)
out=np.zeros((int(SR*DUR),2))
def hz(m): return 440*2**((m-69)/12)
def pluck(m,t0,vel,pan=0.5,dur=1.8):
    n=int(SR*dur); t=np.arange(n)/SR; f=hz(m)
    s=sum(a*np.sin(2*np.pi*f*k*t+rng.uniform(0,6))*np.exp(-t*(2.2+k*1.6)) for k,a in enumerate([1,.45,.25,.12,.06],start=1))
    s*=np.minimum(t/0.004,1)*vel
    b,a=butter(2,3200/(SR/2)); s=lfilter(b,a,s)
    i=int(t0*SR); e=min(len(out),i+n)
    if e<=i: return
    out[i:e,0]+=s[:e-i]*(1-pan); out[i:e,1]+=s[:e-i]*pan
def strings(ms,t0,dur,vel):
    n=int(SR*dur); t=np.arange(n)/SR
    env=np.minimum(t/1.2,1)*np.minimum((dur-t)/1.0,1)
    s=0
    for m in ms:
        for d in (-0.6,0.6):
            s=s+np.sin(2*np.pi*(hz(m)+d)*t+rng.uniform(0,6))+0.3*np.sin(2*np.pi*(hz(m)*2+d)*t)
    b,a=butter(2,1800/(SR/2)); s=lfilter(b,a,s)*env*vel
    i=int(t0*SR); e=min(len(out),i+n); out[i:e,0]+=s[:e-i]; out[i:e,1]+=s[:e-i]
# G  Em  C  D  (one bar = 4 beats)
bars=[([55,62,67,71],[43,50,55]),([52,59,64,67],[40,47,52]),([48,55,60,64],[36,43,48]),([50,57,62,66],[38,45,50])]
bar=4*B
for k in range(int(DUR/bar)+1):
    notes,low=bars[k%4]; t0=k*bar
    if t0>=DUR: break
    strings(low,t0,min(bar+0.8,DUR-t0),0.02+0.004*k)
    pat=[0,1,2,3,2,1,2,3]   # gentle fingerpicked arpeggio, eighths
    for j,p in enumerate(pat):
        pluck(notes[p]-(12 if p==0 else 0),t0+j*B/2,0.17 if j%2==0 else 0.12,0.35+0.3*(p/3))
# tender top melody entering from bar 2
for t,m in [(bar*1+0.0,71),(bar*1+1.5*B,74),(bar*2+0.0,76),(bar*2+2*B,74),(bar*3+0.0,71),(bar*3+2*B,67)]:
    if t<DUR-0.8: pluck(m+12,t,0.2,0.6,2.4)
ir=rng.standard_normal((int(SR*2.0),2))*np.exp(-np.arange(int(SR*2.0))/SR/0.55)[:,None]
wet=np.stack([fftconvolve(out[:,c],ir[:,c])[:len(out)] for c in (0,1)],1)
y=out*0.8+wet*0.09
y*=np.minimum(1,(DUR-np.arange(len(y))/SR)/1.2)[:,None]; y/=np.abs(y).max()/0.8
wavfile.write('scripts/rabbit/music/busytrans-bed.wav',SR,(y*32767).astype(np.int16))
