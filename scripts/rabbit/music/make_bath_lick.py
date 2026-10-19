# Dry comb/brush-through-fur SFX for rabbit-bath. Only while the head is turned back (~4.9-7.3 s); silent elsewhere.
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, lfilter
SR=44100; DUR=10.2
rng=np.random.default_rng(47)
out=np.zeros(int(SR*DUR))
def stroke(t0,dur,vel):
    n=int(SR*dur); t=np.arange(n)/SR
    x=rng.standard_normal(n)
    b,a=butter(3,[3500/(SR/2),11000/(SR/2)],btype='band'); y=lfilter(b,a,x)
    # bristle texture: random gating at ~300-500 Hz, smoothed slightly
    g=(rng.random(n//90+2)>0.45).astype(float); g=np.repeat(g,90)[:n]
    b,a=butter(1,2500/(SR/2)); g=lfilter(b,a,g)
    y*=(0.35+0.65*g)
    ph=t/dur
    env=np.minimum(ph/0.12,1)*np.minimum((1-ph)/0.25,1)   # quick attack, flat, short tail
    env*=(1-0.25*ph)                                       # slightly fading along the stroke
    out[int(t0*SR):int(t0*SR)+n]+=y*env*vel
t=4.95
for cnt,v in [(4,1.0),(4,0.85)]:
    for c in range(cnt):
        d=rng.uniform(0.2,0.25); stroke(t,d,v*(0.9 if c%2 else 1.0)); t+=d+0.05
    t+=0.3
print("sfx ends at",round(t,2))
out/=np.abs(out).max()/0.8
wavfile.write('scripts/rabbit/music/bath-lick.wav',SR,(out*32767).astype(np.int16))
