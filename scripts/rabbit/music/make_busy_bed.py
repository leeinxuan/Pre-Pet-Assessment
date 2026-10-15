# Soft solo-piano bed for busy-day-transition: lonely (sparse, A minor) -> warm (flowing, C major)
import numpy as np
from scipy.io import wavfile
from scipy.signal import fftconvolve, butter, lfilter
SR=44100; DUR=14.0
rng=np.random.default_rng(7)
out=np.zeros((int(SR*DUR),2))
def hz(m): return 440*2**((m-69)/12)
def note(m,t0,dur,vel,pan=0.5):
    f=hz(m); n=int(SR*dur); t=np.arange(n)/SR
    tau=0.9+ (84-m)*0.05
    s=np.zeros(n)
    for k,a in enumerate([1,.5,.28,.14,.08,.05],start=1):
        s+=a*np.sin(2*np.pi*f*k*(1+0.0003*k*k)*t+rng.uniform(0,6))*np.exp(-t*(k*0.35)/tau*1.4)
    env=np.minimum(t/0.006,1)*np.exp(-t/tau)
    s*=env*vel
    b,a=butter(2,2800/(SR/2)); s=lfilter(b,a,s)
    i=int(t0*SR); e=min(len(out),i+n)
    out[i:e,0]+=s[:e-i]*(1-pan); out[i:e,1]+=s[:e-i]*pan
# lonely part: sparse single notes (A minor)
for t,m,v in [(0.2,57,.5),(1.6,64,.4),(3.0,60,.4),(4.3,67,.35)]:
    note(m,t,3.5,v,0.45)
# bridge: gentle chords
for t,ms in [(5.2,[53,60,65]),(6.8,[55,62,67])]:
    for j,m in enumerate(ms): note(m,t+j*0.07,3.5,.38,0.5)
# warm part: flowing arpeggios, C F G C
chords=[[48,55,64,72],[53,60,65,69],[55,62,67,71],[48,55,64,72]]
t=8.2
for c in chords:
    for j,m in enumerate(c+[c[2]]):
        note(m,t+j*0.28,3.0,.42-0.02*j,0.35+0.08*j)
    t+=1.5
# reverb + master
ir=rng.standard_normal((int(SR*2.2),2))*np.exp(-np.arange(int(SR*2.2))/SR/0.6)[:,None]
wet=np.stack([fftconvolve(out[:,c],ir[:,c])[:len(out)] for c in (0,1)],1)
y=out*0.75+wet*0.06
fade=np.minimum(1,(DUR-np.arange(len(y))/SR)/1.5)
y*=fade[:,None]; y/=np.abs(y).max()/0.8
wavfile.write('scripts/rabbit/music/busy-day-bed.wav',SR,(y*32767).astype(np.int16))
