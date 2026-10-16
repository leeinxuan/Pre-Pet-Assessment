# Foley-only soundtrack for first-day: soft mat thumps (hops), wooden house thump/scuffle, faint room tone. Run from repo root.
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, lfilter
SR=44100; DUR=10.0
rng=np.random.default_rng(5)
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
def sniff(vel=1.0):
    s=np.zeros(int(SR*0.5))
    for k,(t0,d) in enumerate([(0.0,.07),(0.12,.07),(0.24,.09)]):
        n=int(SR*d); t=np.arange(n)/SR
        b=bp(rng.standard_normal(n),1800,6000)*np.sin(np.pi*t/d)**1.5*(1-0.2*k)
        i=int(t0*SR); s[i:i+n]+=b
    return s*vel
# room tone
rt=lp(rng.standard_normal(len(out)),300,1)*0.004
out[:,0]+=rt; out[:,1]+=rt
# freeze: just a tiny shuffle (no sniffs)
put(pat(.10),2.3,0.4)
# dash: push-off / landing pairs on the mat
for t,v in [(3.75,.8),(4.05,.9),(4.25,.7),(4.5,.9),(4.65,.7),(4.8,.9),(5.0,.6),(5.15,.8)]:
    put(thump(vel=v*0.55),t,0.5)
    put(pat(v*0.10),t+0.02,0.5)
# into the hiding house
put(wood(0.45),5.3,0.6); put(scuff(0.3,0.20),5.4,0.6); put(wood(0.18),5.62,0.6)
y=out*np.minimum(1,(DUR-np.arange(len(out))/SR)/0.6)[:,None]
y/=np.abs(y).max()/0.7
wavfile.write('scripts/rabbit/music/firstday-sfx.wav',SR,(y*32767).astype(np.int16))
