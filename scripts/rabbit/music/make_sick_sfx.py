# Foley for sick: quiet room tone, soft clock tick, slow breaths, tiny shuffle (no sniffs). Run from repo root.
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, lfilter
SR=44100; DUR=10.0
rng=np.random.default_rng(31)
out=np.zeros((int(SR*DUR),2))
def put(s,t0,pan=0.5,g=1.0):
    i=int(t0*SR); e=min(len(out),i+len(s)); s=s[:e-i]*g
    out[i:e,0]+=s*(1-pan)*1.4; out[i:e,1]+=s*pan*1.4
def bp(x,lo,hi,o=2):
    b,a=butter(o,[lo/(SR/2),hi/(SR/2)],'band'); return lfilter(b,a,x)
def lp(x,f,o=2):
    b,a=butter(o,f/(SR/2)); return lfilter(b,a,x)
def tick(vel=1.0,f=1700):
    n=int(SR*0.06); t=np.arange(n)/SR
    return (np.sin(2*np.pi*f*t)*np.exp(-t/0.006)+0.4*bp(rng.standard_normal(n),2000,6000)*np.exp(-t/0.004))*vel
def breath(vel=1.0,dur=1.1):
    n=int(SR*dur); t=np.arange(n)/SR
    return bp(rng.standard_normal(n),250,1500)*np.sin(np.pi*t/dur)**2*vel
def shuffle(vel=1.0,dur=0.4):
    n=int(SR*dur); t=np.arange(n)/SR
    return bp(rng.standard_normal(n),500,3000)*np.sin(np.pi*t/dur)**2*vel
t_all=np.arange(len(out))/SR
rt=lp(rng.standard_normal(len(out)),300,1)*0.006
out[:,0]+=rt; out[:,1]+=rt
# clock ticking in the room (alternating tick/tock, 1 s)
k=0; t=0.4
while t<DUR-0.2:
    put(tick(0.10 if k%2==0 else 0.08, 1700 if k%2==0 else 1400),t,0.8); t+=1.0; k+=1
# slow breathing ~ every 2.2 s
t=0.6
while t<DUR-1.2:
    put(breath(0.09,1.1),t,0.5); t+=2.2
# head lowers toward hay (~2.6-4.5 s) / turns away (~5 s): soft shuffles
put(shuffle(0.10,0.5),3.1,0.4); put(shuffle(0.08,0.4),5.1,0.4); put(shuffle(0.06,0.5),7.0,0.5)
y=out*np.minimum(1,(DUR-np.arange(len(out))/SR)/0.6)[:,None]
y/=np.abs(y).max()/0.7
wavfile.write('scripts/rabbit/music/sick-sfx.wav',SR,(y*32767).astype(np.int16))
