"""Tiny procedural sound-effect kit (numpy/scipy only, mono, 44.1 kHz).
Every function returns a float32 array in roughly -1..1; place it with place()."""
import numpy as np
from scipy.signal import butter, sosfilt
SR = 44100
rng = np.random.default_rng(7)

def _t(d): return np.arange(int(d * SR)) / SR
def _bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], btype="band", fs=SR, output="sos"), x)
def _lp(x, f, order=2):
    return sosfilt(butter(order, f, btype="low", fs=SR, output="sos"), x)
def _hp(x, f, order=2):
    return sosfilt(butter(order, f, btype="high", fs=SR, output="sos"), x)
def _env(n, a=0.002, d=0.1):
    t = np.arange(n) / SR
    return np.minimum(t / max(a, 1e-4), 1.0) * np.exp(-t / d)
def _norm(x, peak=1.0):
    m = np.max(np.abs(x)) or 1.0
    return (x / m * peak).astype(np.float32)

def place(track, x, at, gain_db=0.0):
    i = int(at * SR); g = 10 ** (gain_db / 20)
    n = max(0, min(len(x), len(track) - i))
    if n > 0 and i >= 0: track[i:i + n] += x[:n] * g
    return track

# ---- impacts -------------------------------------------------------------
def thud(f=85, d=0.12, noise=0.25):
    n = int(0.4 * SR); t = np.arange(n) / SR
    x = np.sin(2 * np.pi * (f + 40 * np.exp(-t / 0.03)) * t) * np.exp(-t / d)
    x += noise * _lp(rng.standard_normal(n), 400) * np.exp(-t / 0.03)
    return _norm(x, 0.9)

def paw_step(soft=1.0):
    n = int(0.12 * SR); t = np.arange(n) / SR
    x = _bp(rng.standard_normal(n), 150, 900) * np.exp(-t / 0.018) * 0.7
    x += np.sin(2 * np.pi * 110 * t) * np.exp(-t / 0.02) * 0.4
    return _norm(x, 0.35 * soft)

def tap(f=2200, d=0.015):
    n = int(0.08 * SR); t = np.arange(n) / SR
    x = _bp(rng.standard_normal(n), f * 0.6, f * 1.6) * np.exp(-t / d)
    return _norm(x, 0.6)

def click(f=3000):
    return tap(f, 0.006)

def clack_pair(gap=0.07):
    a = tap(1800, 0.012); b = tap(1400, 0.02)
    out = np.zeros(int((gap + 0.1) * SR), np.float32)
    out[:len(a)] += a; out[int(gap * SR):int(gap * SR) + len(b)] += b * 0.8
    return out

# ---- glass / ceramic -------------------------------------------------------
def shatter(d=1.1):
    n = int(d * SR); t = np.arange(n) / SR
    x = np.zeros(n)
    # initial crack: broadband burst
    x += _hp(rng.standard_normal(n), 1800) * np.exp(-t / 0.05) * 0.9
    # body thud (ceramic hitting a hard floor)
    x += np.sin(2 * np.pi * 150 * t) * np.exp(-t / 0.05) * 0.5
    # many tinkling shards
    for _ in range(26):
        at = rng.uniform(0.02, 0.85) ** 1.4 * 0.9
        f = rng.uniform(2200, 7800)
        dec = rng.uniform(0.02, 0.09)
        k = int(0.3 * SR); tt = np.arange(k) / SR
        ping = (np.sin(2 * np.pi * f * tt) + 0.4 * np.sin(2 * np.pi * f * 2.7 * tt)) * np.exp(-tt / dec)
        i = int(at * SR); m = min(k, n - i)
        x[i:i + m] += ping[:m] * rng.uniform(0.12, 0.4)
    # a few bigger pieces skittering
    for at, f in [(0.12, 900), (0.26, 1300), (0.43, 1100), (0.62, 1500)]:
        k = int(0.12 * SR); tt = np.arange(k) / SR
        ping = np.sin(2 * np.pi * f * tt) * np.exp(-tt / 0.025) * 0.35
        i = int(at * SR); x[i:i + k] += ping[:n - i][:k] if i + k <= n else 0
    return _norm(x, 0.95)

def clatter(count=6, span=0.8):
    n = int((span + 0.4) * SR); x = np.zeros(n)
    for _ in range(count):
        at = rng.uniform(0, span)
        f = rng.uniform(600, 3500)
        k = int(0.25 * SR); tt = np.arange(k) / SR
        s = (np.sin(2 * np.pi * f * tt) * np.exp(-tt / rng.uniform(0.02, 0.07))
             + 0.3 * _bp(rng.standard_normal(k), 800, 4000) * np.exp(-tt / 0.02))
        i = int(at * SR); m = min(k, n - i); x[i:i + m] += s[:m] * rng.uniform(0.3, 0.8)
    return _norm(x, 0.7)

def bowl_clink():
    n = int(0.7 * SR); t = np.arange(n) / SR
    x = (np.sin(2 * np.pi * 2650 * t) * np.exp(-t / 0.12) + 0.6 * np.sin(2 * np.pi * 4100 * t) * np.exp(-t / 0.07)
         + 0.3 * np.sin(2 * np.pi * 6200 * t) * np.exp(-t / 0.04))
    return _norm(x, 0.5)

# ---- soft / organic --------------------------------------------------------
def whoosh(d=0.35, lo=500, hi=4000):
    n = int(d * SR); t = np.arange(n) / SR
    env = np.sin(np.pi * t / d) ** 2
    return _norm(_bp(rng.standard_normal(n), lo, hi) * env, 0.5)

def rustle(d=0.6, level=0.4):
    n = int(d * SR); x = _hp(rng.standard_normal(n), 1500)
    x *= (0.4 + 0.6 * np.abs(_lp(rng.standard_normal(n), 14))) * np.sin(np.pi * np.arange(n) / n) ** 1.5
    return _norm(x, level)

def purr(d=4.0, level=0.5, rate=24.0, swell=0.6):
    n = int(d * SR); t = np.arange(n) / SR
    carrier = _bp(rng.standard_normal(n), 60, 420, 3)
    am = 0.55 + 0.45 * np.sin(2 * np.pi * rate * t) ** 2
    drift = 0.9 + 0.1 * np.sin(2 * np.pi * 0.25 * t)
    env = np.minimum(t / swell, 1) * np.minimum((d - t) / swell, 1)
    return _norm(carrier * am * drift * env, level)

def sigh(d=1.2, level=0.35):
    n = int(d * SR); t = np.arange(n) / SR
    env = np.sin(np.pi * np.clip(t / d, 0, 1)) ** 1.5
    return _norm(_bp(rng.standard_normal(n), 300, 2200) * env, level)

def chime(f=1318.5, d=1.6, level=0.45):
    n = int(d * SR); t = np.arange(n) / SR
    x = sum(a * np.sin(2 * np.pi * f * m * t) * np.exp(-t / (d * k)) for m, a, k in [(1, 1, 0.35), (2.0, 0.4, 0.2), (3.01, 0.2, 0.12), (4.2, 0.1, 0.08)])
    return _norm(x, level)

def sparkle(level=0.4):
    out = np.zeros(int(1.6 * SR), np.float32)
    for i, f in enumerate([1568, 1976, 2349, 2637]):
        c = chime(f, 1.0, 0.5); at = int(i * 0.09 * SR); out[at:at + len(c)] += c[:len(out) - at]
    return _norm(out, level)

def creak(d=0.45, level=0.35):
    n = int(d * SR); t = np.arange(n) / SR
    f = 1300 + 500 * np.sin(2 * np.pi * 3.5 * t) + 300 * t / d
    ph = 2 * np.pi * np.cumsum(f) / SR
    x = (np.sin(ph) + 0.5 * np.sin(2 * ph)) * np.sin(np.pi * t / d) ** 1.2
    x += 0.3 * _bp(rng.standard_normal(n), 900, 3000) * np.sin(np.pi * t / d)
    return _norm(x, level)

# ---- beds ------------------------------------------------------------------
def car_bed(d, level=0.3):
    n = int(d * SR); t = np.arange(n) / SR
    x = _lp(rng.standard_normal(n), 140, 3) * 1.0
    x += 0.35 * _bp(rng.standard_normal(n), 300, 900) * (0.7 + 0.3 * np.sin(2 * np.pi * 0.7 * t))
    x += 0.5 * np.sin(2 * np.pi * (52 + 3 * np.sin(2 * np.pi * 0.4 * t)) * t) * 0.4
    return _norm(x, level)

def room_tone(d, level=0.05):
    n = int(d * SR)
    return _norm(_lp(rng.standard_normal(n), 500, 2), level)

def fade(x, i=0.05, o=0.05):
    y = x.copy().astype(np.float32); a, b = int(i * SR), int(o * SR)
    if a: y[:a] *= np.linspace(0, 1, a)
    if b: y[-b:] *= np.linspace(1, 0, b)
    return y
