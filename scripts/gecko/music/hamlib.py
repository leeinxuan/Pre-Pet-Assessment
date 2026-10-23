# Instrument + helper library for hamster pet-journey beds (numpy/scipy only). Instruments intentionally differ from the bird set:
# celesta, music box, vibraphone, harmonica (reed), toy piano, harp, nylon guitar, woodblock, shaker, soft pad.
import numpy as np, wave
from scipy.signal import lfilter, butter, sosfilt, fftconvolve
SR = 44100
rng = np.random.RandomState(11)
def hz(m): return 440 * 2 ** ((m - 69) / 12)
def T_(d): return np.arange(int(SR * d)) / SR
def celesta(m, dur=1.4, vel=1.0):
    t = T_(dur); f = hz(m)
    y = np.sin(2*np.pi*f*t) + 0.35*np.sin(2*np.pi*f*4*t)*np.exp(-t*10) + 0.15*np.sin(2*np.pi*f*6.3*t)*np.exp(-t*14)
    return vel * y * np.exp(-t*4.0) * (1 - np.exp(-t*500)) * 0.6
def musicbox(m, dur=2.2, vel=1.0):
    t = T_(dur); f = hz(m)
    y = np.sin(2*np.pi*f*t) + 0.28*np.sin(2*np.pi*f*3.0*t)*np.exp(-t*7) + 0.1*np.sin(2*np.pi*f*5.2*t)*np.exp(-t*12)
    y *= np.exp(-t*2.3) * (1 - np.exp(-t*900))
    click = np.zeros_like(t); n = int(SR*0.004); click[:n] = rng.randn(n)*np.exp(-np.arange(n)/SR*900)*0.15
    return vel * (y*0.6 + click)
def vibe(m, dur=2.6, vel=1.0):
    t = T_(dur); f = hz(m)
    y = np.sin(2*np.pi*f*t) * (1 + 0.14*np.sin(2*np.pi*5.2*t)) + 0.22*np.sin(2*np.pi*f*4*t)*np.exp(-t*6)
    return vel * y * np.exp(-t*1.5) * (1 - np.exp(-t*400)) * 0.55
def reed(m, dur=1.5, vel=1.0, vib=0.004):
    t = T_(dur); f = hz(m)
    vv = 1 + vib*np.sin(2*np.pi*5.3*t)*np.minimum(1, t/0.4)
    ph = 2*np.pi*np.cumsum(f*vv)/SR
    y = sum(np.sin(k*ph)/k for k in (1, 3, 5, 7, 9)) + 0.12*rng.randn(len(t))*0.2
    env = np.minimum(1, t/0.07) * np.minimum(1, (dur - t)/0.25)
    y = sosfilt(butter(2, 2800, 'low', fs=SR, output='sos'), y)
    return vel * y * env * 0.5
def toypiano(m, dur=0.7, vel=1.0):
    t = T_(dur); f = hz(m); y = 0
    for r, a in ((1, 1), (2.76, .5), (5.4, .3), (8.9, .15)): y = y + a*np.sin(2*np.pi*f*r*t)
    return vel * y * np.exp(-t*8.5) * (1 - np.exp(-t*1000)) * 0.4
def pluckKS(m, dur, vel=1.0, decay=0.996, lp=1.0):
    f = hz(m); N = int(SR/f); n = int(SR*dur)
    x = np.zeros(n); x[:N] = rng.uniform(-1, 1, N)
    a = np.zeros(N+2); a[0] = 1; a[N] = -0.5*decay; a[N+1] = -0.5*decay
    y = lfilter([1], a, x)
    if lp < 1.0: y = sosfilt(butter(2, 1500+3500*lp, 'low', fs=SR, output='sos'), y)
    y *= np.exp(-np.arange(n)/SR*2.6)
    return vel * y / (np.abs(y).max() + 1e-9) * 0.7
def harp(m, dur=2.0, vel=1.0): return pluckKS(m, dur, vel, 0.9985, 0.55)
def guitar(m, dur=1.6, vel=1.0): return pluckKS(m, dur, vel, 0.996, 0.35)
_bp = butter(2, [800, 2600], 'band', fs=SR, output='sos')
def woodblock(vel=1.0):
    t = T_(0.09); y = np.sin(2*np.pi*1050*t)*np.exp(-t*60) + sosfilt(_bp, rng.randn(len(t)))*np.exp(-t*80)*0.8
    return vel * y * 0.5
_hp = butter(2, [5000, 9500], 'band', fs=SR, output='sos')
def shaker(vel=1.0):
    t = T_(0.08); return vel * sosfilt(_hp, rng.randn(len(t))) * np.exp(-t*45) * 0.35 * np.minimum(1, t/0.008)
def pad(notes, dur, vel=1.0, cutoff=1300):
    t = T_(dur); y = np.zeros(len(t))
    for m in notes:
        for det in (-0.06, 0.06):
            f = hz(m) * 2**(det/12); y += sum(np.sin(2*np.pi*f*k*t)/k for k in range(1, 6))
    y = sosfilt(butter(2, cutoff, 'low', fs=SR, output='sos'), y)
    env = np.minimum(1, t/(dur*0.35)) * np.minimum(1, (dur - t)/(dur*0.35))
    return vel * y * env * 0.05
def put(buf, x, t):
    s = int(t*SR)
    if s < 0 or s >= len(buf): return
    e = min(len(buf), s+len(x)); buf[s:e] += x[:e-s]
def reverb(x, amt=0.3, tail=1.6, seed=5):
    n = int(SR*tail); t = np.arange(n)/SR
    ir = np.random.RandomState(seed).randn(n) * np.exp(-t*3.0); ir[0] = 0
    return x + amt * fftconvolve(x, ir)[:len(x)] / 16
def save(path, x, total):
    n = int(SR*total); x = np.pad(x, (0, max(0, n-len(x))))[:n].copy()
    fo = int(0.9*SR); x[-fo:] *= np.linspace(1, 0, fo)
    x = x / (np.abs(x).max() + 1e-9) * 0.9
    with wave.open(path, 'w') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x*32767).astype(np.int16).tobytes())
def seq(buf, inst, beat, items, t0=0.0, **kw):
    # items: (beat_pos, midi, dur_beats, vel)
    for bp, m, db, v in items: put(buf, inst(m, max(0.3, db*beat+0.6), v, **kw) if inst in (reed,) else inst(m, max(0.3, db*beat+0.8), v), t0 + bp*beat)
