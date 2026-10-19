# Light, gently humorous major-key bed for rabbit-bath (C major, ~100 BPM, soft marimba + pluck bass + pad). No SFX.
import numpy as np
from scipy.io import wavfile
from scipy.signal import fftconvolve, butter, lfilter
SR=44100; DUR=10.2; BPM=100; B=60/BPM
rng=np.random.default_rng(11)
out=np.zeros((int(SR*DUR),2))
def hz(m): return 440*2**((m-69)/12)
def mar(m,t0,vel,pan=0.5,dur=1.0):
    n=int(SR*dur); t=np.arange(n)/SR; f=hz(m)
    s=np.sin(2*np.pi*f*t)*np.exp(-t*7)+0.35*np.sin(2*np.pi*f*4*t)*np.exp(-t*20)+0.15*np.sin(2*np.pi*f*2*t)*np.exp(-t*10)
    s*=vel; i=int(t0*SR); e=min(len(out),i+n)
    out[i:e,0]+=s[:e-i]*(1-pan); out[i:e,1]+=s[:e-i]*pan
def pluck(m,t0,vel,dur=0.6):
    n=int(SR*dur); t=np.arange(n)/SR; f=hz(m)
    s=(np.sin(2*np.pi*f*t)+0.3*np.sin(2*np.pi*f*2*t))*np.exp(-t*6)*vel
    i=int(t0*SR); e=min(len(out),i+n); out[i:e,0]+=s[:e-i]*.5; out[i:e,1]+=s[:e-i]*.5
def pad(ms,t0,dur,vel):
    n=int(SR*dur); t=np.arange(n)/SR
    env=np.minimum(t/0.8,1)*np.minimum((dur-t)/0.8,1)
    s=sum(np.sin(2*np.pi*hz(m)*t)+0.2*np.sin(2*np.pi*hz(m)*2*t) for m in ms)*env*vel
    i=int(t0*SR); e=min(len(out),i+n); out[i:e,0]+=s[:e-i]; out[i:e,1]+=s[:e-i]
chords=[([48,55,64],36),([45,52,60],33),([41,48,57],29),([43,50,59],31)]  # C Am F G
bar=4*B
for k in range(int(DUR/bar)+1):
    ch,root=chords[k%4]; t0=k*bar
    if t0>=DUR: break
    pad(ch,t0,min(bar+0.3,DUR-t0),0.035)
    for j,o in enumerate([0,7,12,7]): pluck(root+12+o,t0+j*B,0.16)
mel=[(0,76),(1,79),(1.5,77),(2,76),(3,72),(4,74),(5,76),(5.5,74),(6,72),(7,69),
     (8,72),(9,74),(9.5,76),(10,77),(11,74),(12,72),(13,74),(14,76),(15,72)]
for b,m in mel:
    t=0.3+b*B*0.5*2/2*0.5*2
    if t<DUR-0.6: mar(m,t,0.30,0.55)
ir=rng.standard_normal((int(SR*1.6),2))*np.exp(-np.arange(int(SR*1.6))/SR/0.45)[:,None]
wet=np.stack([fftconvolve(out[:,c],ir[:,c])[:len(out)] for c in (0,1)],1)
y=out*0.8+wet*0.06
y*=np.minimum(1,(DUR-np.arange(len(y))/SR)/1.2)[:,None]; y/=np.abs(y).max()/0.8
wavfile.write('scripts/rabbit/music/bath-bed.wav',SR,(y*32767).astype(np.int16))
