# Gentle major-key piano arpeggios + warm pad for sick (calm, cozy, not tense)
import numpy as np
from scipy.io import wavfile
from scipy.signal import fftconvolve, butter, lfilter
SR=44100; DUR=10.0
rng=np.random.default_rng(21)
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
# F - Dm - Bb - C : sparse, slow, gently wistful but warm (no minor-pad eeriness)
chords=[(0.0,[41,48],[65,69,72]),(2.5,[38,45],[62,65,69]),(5.0,[34,46],[62,65,70]),(7.5,[36,48],[64,67,72])]
for t0,bass,arp in chords:
    note(bass[0],t0,3.0,.25,0.5)
    for k,m in enumerate(arp):
        note(m,t0+0.5+k*0.7,2.4,.18,0.45+0.04*k)
pad([53,57,60],0.0,2.6,0.07); pad([50,53,57],2.5,2.6,0.07); pad([46,50,53],5.0,2.6,0.07); pad([48,52,55],7.5,2.5,0.08)
ir=rng.standard_normal((int(SR*2.2),2))*np.exp(-np.arange(int(SR*2.2))/SR/0.6)[:,None]
wet=np.stack([fftconvolve(out[:,c],ir[:,c])[:len(out)] for c in (0,1)],1)
y=out*0.75+wet*0.12
y*=np.minimum(1,(DUR-np.arange(len(y))/SR)/1.4)[:,None]; y/=np.abs(y).max()/0.8
wavfile.write('scripts/rabbit/music/sick-bed.wav',SR,(y*32767).astype(np.int16))
