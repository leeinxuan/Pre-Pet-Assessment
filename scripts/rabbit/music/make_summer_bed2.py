# Light kalimba/music-box pentatonic melody + soft bell pad, breezy and cool (summer-heat v2). Run from repo root.
import numpy as np
from scipy.io import wavfile
from scipy.signal import fftconvolve, butter, lfilter
SR=44100; DUR=10.2
rng=np.random.default_rng(3)
out=np.zeros((int(SR*DUR),2))
def hz(m): return 440*2**((m-69)/12)
def kal(m,t0,vel,pan=0.5):
    f=hz(m); n=int(SR*1.6); t=np.arange(n)/SR
    s=(np.sin(2*np.pi*f*t)+0.35*np.sin(2*np.pi*f*4.0*t)*np.exp(-t*18)+0.15*np.sin(2*np.pi*f*2*t))*np.exp(-t/0.55)
    s*=np.minimum(t/0.003,1)*vel
    i=int(t0*SR); e=min(len(out),i+n)
    out[i:e,0]+=s[:e-i]*(1-pan); out[i:e,1]+=s[:e-i]*pan
def pad(ms,t0,dur,vel):
    n=int(SR*dur); t=np.arange(n)/SR
    env=np.minimum(t/1.2,1)*np.minimum((dur-t)/1.2,1)
    s=sum(np.sin(2*np.pi*hz(m)*t)+0.2*np.sin(2*np.pi*2*hz(m)*t) for m in ms)
    b,a=butter(2,1500/(SR/2)); s=lfilter(b,a,s)*env*vel/len(ms)
    i=int(t0*SR); e=min(len(out),i+n)
    out[i:e,0]+=s[:e-i]; out[i:e,1]+=s[:e-i]
# gentle pentatonic (D major pentatonic: D E F# A B), unhurried
mel=[(0.5,74),(1.4,81),(2.3,78),(3.4,76),(4.4,81),(5.4,83),(6.5,81),(7.6,78),(8.6,74)]
for k,(t,m) in enumerate(mel): kal(m,t,0.30,0.35+0.3*(k%2))
for t,m in [(0.0,50),(3.4,45),(6.5,47),(8.6,50)]: kal(m,t,0.30,0.5)
pad([62,66,69],0.0,3.4,0.10); pad([57,61,64],3.4,3.2,0.10); pad([59,62,66],6.5,3.7,0.10)
ir=rng.standard_normal((int(SR*2.0),2))*np.exp(-np.arange(int(SR*2.0))/SR/0.6)[:,None]
wet=np.stack([fftconvolve(out[:,c],ir[:,c])[:len(out)] for c in (0,1)],1)
y=out*0.8+wet*0.12
y*=np.minimum(1,(DUR-np.arange(len(y))/SR)/1.4)[:,None]; y/=np.abs(y).max()/0.8
wavfile.write('scripts/rabbit/music/summer-bed2.wav',SR,(y*32767).astype(np.int16))
