# Foley-only soundtrack for summer-heat: soft mat thumps (hops), wooden house thump/scuffle, faint room tone. Run from repo root.
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, lfilter
SR=44100; DUR=9.7
rng=np.random.default_rng(8)
out=np.zeros((int(SR*DUR),2))
def put(s,t0,pan=0.5,g=1.0):
    i=int(t0*SR); e=min(len(out),i+len(s)); s=s[:e-i]*g
    out[i:e,0]+=s*(1-pan)*1.4; out[i:e,1]+=s*pan*1.4
def bp(x,lo,hi,o=2):
    b,a=butter(o,[lo/(SR/2),hi/(SR/2)],'band'); return lfilter(b,a,x)
def lp(x,f,o=2):
    b,a=butter(o,f/(SR/2)); return lfilter(b,a,x)
def thump(f0=95,dur=0.16,vel=1.0):   # soft landing on the mat
    n=int(SR*dur); t=np.arange(n)/SR
    s=np.sin(2*np.pi*(f0*np.exp(-t*9)+45)*t)*np.exp(-t/0.035)
    s+=lp(rng.standard_normal(n),700)*np.exp(-t/0.02)*0.6
    return s*vel
def pat(vel=1.0):   # tiny paw pat
    n=int(SR*0.07); t=np.arange(n)/SR
    return lp(rng.standard_normal(n),1400)*np.exp(-t/0.012)*vel
def wood(vel=1.0):
    n=int(SR*0.22); t=np.arange(n)/SR
    s=np.sin(2*np.pi*190*t)*np.exp(-t/0.05)+0.5*np.sin(2*np.pi*410*t)*np.exp(-t/0.025)
    s+=bp(rng.standard_normal(n),600,2500)*np.exp(-t/0.008)*0.5
    return s*vel
def scuff(dur=0.35,vel=1.0):
    n=int(SR*dur); t=np.arange(n)/SR
    return bp(rng.standard_normal(n),500,3500)*np.sin(np.pi*t/dur)**2*vel
def breath(vel=1.0,dur=0.7):   # very soft airy breath
    n=int(SR*dur); t=np.arange(n)/SR
    return bp(rng.standard_normal(n),300,1800)*np.sin(np.pi*t/dur)**2*vel
def flop(vel=1.0):
    n=int(SR*0.35); t=np.arange(n)/SR
    s=np.sin(2*np.pi*(70*np.exp(-t*6)+40)*t)*np.exp(-t/0.09)+lp(rng.standard_normal(n),500)*np.exp(-t/0.07)*0.6
    return s*vel
def tap(vel=1.0):   # ceramic tile touch
    n=int(SR*0.12); t=np.arange(n)/SR
    return (np.sin(2*np.pi*900*t)*np.exp(-t/0.02)+0.4*bp(rng.standard_normal(n),1500,5000)*np.exp(-t/0.01))*vel
# room tone + fan hum fading in
t_all=np.arange(len(out))/SR
fan=(lp(rng.standard_normal(len(out)),400,1)*0.012+np.sin(2*np.pi*118*t_all)*0.004)*np.clip((t_all-0.5)/3.0,0,1)
rt=lp(rng.standard_normal(len(out)),300,1)*0.004
out[:,0]+=rt+fan; out[:,1]+=rt+fan
# fast breathing at first, slowing after settling on the tile
bt=[0.3,1.0,1.7,2.3,3.0,5.4,6.8,8.3]
for i,tb in enumerate(bt): put(breath(0.10 if tb<5 else 0.07, 0.55 if tb<5 else 0.9),tb,0.5)
# getting up and shuffling across the mat to the tile (video v3: stands 2.7s, steps onto tile ~4.6s, lies down ~5.4s)
for tt,v in [(2.6,.6),(3.0,.5),(3.4,.5),(3.8,.5),(4.2,.5)]:
    put(pat(v*0.14),tt,0.5); put(thump(95,0.12,v*0.25),tt+0.03,0.5)
put(tap(0.28),4.3,0.6); put(tap(0.2),4.55,0.6)
put(pat(0.12),4.75,0.6)
put(flop(0.8),5.0,0.6); put(scuff(0.5,0.12),5.2,0.6)
y=out*np.minimum(1,(DUR-np.arange(len(out))/SR)/0.6)[:,None]
y/=np.abs(y).max()/0.7
wavfile.write('scripts/rabbit/music/summer-sfx4.wav',SR,(y*32767).astype(np.int16))
