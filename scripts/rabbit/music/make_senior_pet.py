# Gentle hand-stroking-fur SFX for senior-life (petting shot starts ~6.0 s; slow strokes, soft low-mid rustle, no bristle crackle)
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, lfilter
SR=44100; DUR=10.2
rng=np.random.default_rng(97)
out=np.zeros(int(SR*DUR))
def stroke(t0,dur,vel):
    n=int(SR*dur); t=np.arange(n)/SR; x=rng.standard_normal(n)
    b,a=butter(2,[350/(SR/2),3200/(SR/2)],btype='band'); y=lfilter(b,a,x)
    # soft fur grain: slow-ish random amplitude, much gentler than a brush
    g=rng.random(n//600+2); g=np.repeat(g,600)[:n]
    b,a=butter(1,250/(SR/2)); g=lfilter(b,a,g)
    y*=(0.65+0.35*g/g.max())
    ph=t/dur
    env=np.sin(np.pi*ph)**2        # smooth swell and fade
    out[int(t0*SR):int(t0*SR)+n]+=y*env*vel
t=6.2
for d,v in [(0.85,0.85),(0.85,1.0),(0.85,0.9)]:
    stroke(t,d,v); t+=d+0.1
print("pet sfx ends",round(t,2))
out/=np.abs(out).max()/0.8
wavfile.write('scripts/rabbit/music/senior-pet.wav',SR,(out*32767).astype(np.int16))
