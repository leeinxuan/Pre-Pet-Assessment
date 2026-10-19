# Slow, woozy "unwell" bed for sick (D minor, ~46 BPM, low drone + sparse soft piano, tape wow/flutter). No SFX.
import numpy as np
from scipy.io import wavfile
from scipy.signal import fftconvolve, butter, lfilter
SR=44100; DUR=10.2
rng=np.random.default_rng(83)
out=np.zeros((int(SR*DUR),2))
def hz(m): return 440*2**((m-69)/12)
def note(m,t0,dur,vel,pan=0.5):
    n=int(SR*dur); t=np.arange(n)/SR; f=hz(m)
    s=sum(a*np.sin(2*np.pi*f*k*(1+0.0004*k*k)*t+rng.uniform(0,6))*np.exp(-t*(0.5+0.5*k)) for k,a in enumerate([1,.45,.2,.1],start=1))
    s*=np.minimum(t/0.03,1)*vel
    b,a=butter(2,1400/(SR/2)); s=lfilter(b,a,s)   # muffled
    i=int(t0*SR); e=min(len(out),i+n)
    out[i:e,0]+=s[:e-i]*(1-pan); out[i:e,1]+=s[:e-i]*pan
def drone(ms,t0,dur,vel):
    n=int(SR*dur); t=np.arange(n)/SR
    env=np.minimum(t/2.0,1)*np.minimum((dur-t)/2.0,1)
    trem=0.75+0.25*np.sin(2*np.pi*0.28*t)
    s=0
    for m in ms:
        for d in (-1.1,1.1): s=s+np.sin(2*np.pi*(hz(m)+d)*t+rng.uniform(0,6))
    b,a=butter(2,520/(SR/2)); s=lfilter(b,a,s)*env*trem*vel
    i=int(t0*SR); e=min(len(out),i+n); out[i:e,0]+=s[:e-i]; out[i:e,1]+=s[:e-i]
drone([38,45],0.0,DUR,0.05)               # D2 + A2
drone([53],3.5,DUR-3.5,0.03)              # F3 colour, slowly arrives
# very sparse falling melody, long gaps (D minor, with a b6/maj7 sigh)
for t,m,v in [(0.6,62,.5),(2.9,65,.42),(5.0,64,.38),(6.6,58,.38),(8.3,57,.36)]:
    note(m,t,4.5,v,0.45)
for t,ms in [(1.8,[50,57]),(6.0,[46,53])]:
    for j,m in enumerate(ms): note(m,t+j*0.1,5.0,.28,0.5)
ir=rng.standard_normal((int(SR*2.8),2))*np.exp(-np.arange(int(SR*2.8))/SR/0.9)[:,None]
wet=np.stack([fftconvolve(out[:,c],ir[:,c])[:len(out)] for c in (0,1)],1)
y=out*0.7+wet*0.18
# tape wow: slow pitch wobble (~14 cents) + faint flutter
n=len(y); t=np.arange(n)/SR
tw=t+0.0025*np.sin(2*np.pi*0.45*t)+0.0003*np.sin(2*np.pi*5.3*t)
y=np.stack([np.interp(tw,t,y[:,c]) for c in (0,1)],1)
y*=np.minimum(1,(DUR-t)/1.5)[:,None]; y/=np.abs(y).max()/0.8
wavfile.write('scripts/rabbit/music/sick-bed2.wav',SR,(y*32767).astype(np.int16))
