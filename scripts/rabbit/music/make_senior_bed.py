# Slow warm-but-melancholy piano + soft string pad for senior-life (Am -> F -> C -> G -> C, tender ending)
import numpy as np
from scipy.io import wavfile
from scipy.signal import fftconvolve, butter, lfilter
SR=44100; DUR=9.4
rng=np.random.default_rng(11)
out=np.zeros((int(SR*DUR),2))
def hz(m): return 440*2**((m-69)/12)
def note(m,t0,dur,vel,pan=0.5):
    f=hz(m); n=int(SR*dur); t=np.arange(n)/SR
    tau=1.2+(84-m)*0.05
    s=np.zeros(n)
    for k,a in enumerate([1,.5,.28,.14,.08,.05],start=1):
        s+=a*np.sin(2*np.pi*f*k*(1+0.0003*k*k)*t+rng.uniform(0,6))*np.exp(-t*(k*0.35)/tau*1.4)
    s*=np.minimum(t/0.008,1)*np.exp(-t/tau)*vel
    b,a=butter(2,2600/(SR/2)); s=lfilter(b,a,s)
    i=int(t0*SR); e=min(len(out),i+n)
    out[i:e,0]+=s[:e-i]*(1-pan); out[i:e,1]+=s[:e-i]*pan
def pad(ms,t0,dur,vel):
    n=int(SR*dur); t=np.arange(n)/SR
    env=np.minimum(t/1.2,1)*np.minimum((dur-t)/1.2,1)
    s=np.zeros(n)
    for m in ms:
        for d in (-0.004,0.0,0.004):
            f=hz(m)*(1+d)
            s+=(np.sin(2*np.pi*f*t)+0.4*np.sin(2*np.pi*2*f*t)+0.15*np.sin(2*np.pi*3*f*t))
    b,a=butter(2,1800/(SR/2)); s=lfilter(b,a,s)*env*vel/ (len(ms)*3)
    i=int(t0*SR); e=min(len(out),i+n)
    out[i:e,0]+=s[:e-i]; out[i:e,1]+=s[:e-i]*0.95
# piano melody (slow, sparse)
mel=[(0.2,69,.45),(1.6,72,.38),(2.8,69,.38),(4.0,65,.38),(5.0,67,.38),(6.0,72,.42),(7.2,71,.38),(8.0,72,.4)]
for t,m,v in mel: note(m,t,4.0,v,0.5)
# piano bass/chords
for t,ms in [(0.0,[45,52]),(2.4,[41,48]),(4.8,[48,55]),(6.6,[43,50]),(7.9,[48,55,60])]:
    for j,m in enumerate(ms): note(m,t+j*0.07,4.0,.3,0.5)
# strings under the second half
pad([57,60,64],0.0,3.2,0.22)
pad([53,57,60],2.4,3.0,0.22)
pad([55,60,64],4.8,4.6,0.24)
ir=rng.standard_normal((int(SR*2.4),2))*np.exp(-np.arange(int(SR*2.4))/SR/0.7)[:,None]
wet=np.stack([fftconvolve(out[:,c],ir[:,c])[:len(out)] for c in (0,1)],1)
y=out*0.75+wet*0.10
y*=np.minimum(1,(DUR-np.arange(len(y))/SR)/1.4)[:,None]; y/=np.abs(y).max()/0.8
wavfile.write('scripts/rabbit/music/senior-bed.wav',SR,(y*32767).astype(np.int16))
