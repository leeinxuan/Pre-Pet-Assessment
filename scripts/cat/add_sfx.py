#!/usr/bin/env python3
"""Add procedural sound effects (sfx.py) to the cat pet-journey videos.

usage: add_sfx.py NAME VIDEO_IN OUT.mp4 [BASE_AUDIO_FILE KEEP_END]
  NAME       key in CUES below (arrival-transition, night-energy, busy-daily-care, senior-life, climbing)
  VIDEO_IN   file whose video is used; its audio is the bed (music) unless BASE_AUDIO_FILE is given
  BASE_AUDIO_FILE KEEP_END : use only the first KEEP_END s of that file's audio as the bed
                              (busy-daily-care: keep typing/sigh, drop the music) ; 'none' = no bed at all
Cue = (kind, kwargs, start_s, gain_db) ; beds have an extra fade."""
import subprocess, sys, os
import numpy as np
from scipy.io import wavfile
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import sfx
from sfx import place, fade, SR

def steps(times, gain=-14): return [("paw_step", {}, t, gain) for t in times]

CUES = {
 "arrival-transition": [
   ("car_bed", dict(d=1.6, level=0.3), 0.0, -13), ("car_bed", dict(d=2.4, level=0.3), 2.8, -13),
   ("clack_pair", {}, 1.85, -15), ("thud", dict(f=70), 5.25, -13), ("clack_pair", {}, 6.35, -16),
   ("creak", {}, 7.0, -18), *steps([7.7, 8.2, 8.7], -17), ("sparkle", {}, 10.95, -13),
   ("purr", dict(d=4.2, level=0.5, swell=0.9), 10.3, -17)],
 "night-energy": [
   ("whoosh", dict(d=0.3), 0.25, -16), ("thud", dict(f=70), 0.9, -18),
   *steps([1.15, 1.3, 1.45, 1.6, 1.75, 1.9, 2.05], -17),
   ("whoosh", dict(d=0.35), 2.45, -16), ("thud", dict(f=80), 3.1, -14), ("rustle", dict(d=0.4, level=0.4), 3.1, -22),
   ("whoosh", dict(d=0.3), 3.9, -17), ("thud", dict(f=75), 4.5, -14), ("clatter", dict(count=8, span=0.7), 4.75, -12),
   ("purr", dict(d=5.8, level=0.45, swell=1.2), 6.4, -18)],
 "busy-daily-care": [
   ("room_tone", dict(d=11.7, level=0.05), 3.5, -6),
   ("sigh", dict(d=1.3), 4.6, -12), ("bowl_clink", {}, 6.3, -8), ("paw_step", {}, 7.0, -10),
   ("rustle", dict(d=0.6, level=0.4), 9.3, -15), ("thud", dict(f=60, d=0.1), 9.9, -14),
   ("sigh", dict(d=1.6, level=0.3), 11.6, -14), ("sigh", dict(d=1.8, level=0.3), 13.6, -15)],
 "senior-life": [
   ("rustle", dict(d=0.8, level=0.4), 1.0, -25), ("rustle", dict(d=0.6, level=0.4), 3.0, -23), ("thud", dict(f=60, d=0.1), 3.4, -26),
   *steps([5.3, 6.05, 6.8, 7.55, 8.3], -15), ("rustle", dict(d=0.5, level=0.4), 8.9, -25),
   ("purr", dict(d=4.6, level=0.5, swell=1.0), 9.5, -17),
   ("rustle", dict(d=0.5, level=0.4), 10.5, -26), ("rustle", dict(d=0.5, level=0.4), 12.2, -26)],
 "climbing": [
   ("room_tone", dict(d=13.1, level=0.05), 0.0, -6),
   ("tap", dict(f=2600), 2.35, -14), ("tap", dict(f=2400), 3.45, -12), ("tap", dict(f=2800), 4.45, -9), ("whoosh", dict(d=0.2, lo=800, hi=3500), 4.9, -14),
   ("shatter", {}, 5.25, -3), ("tap", dict(f=3200), 6.3, -14), ("tap", dict(f=3600), 6.9, -18)],
}
BEDS = {"car_bed", "room_tone"}

def dur(f): return float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f]).decode())

def main():
    a = sys.argv[1:]
    name, vin, out = a[0], a[1], a[2]
    base, keep = (a[3], a[4]) if len(a) >= 5 else (None, None)
    T = dur(vin)
    sfx.rng = np.random.default_rng(abs(hash(name)) % 1000 if False else sum(map(ord, name)))
    track = np.zeros(int((T + 1.0) * SR), np.float32)
    for kind, kw, at, g in CUES[name]:
        x = getattr(sfx, kind)(**kw)
        if kind in BEDS: x = fade(x, 0.5, 0.5)
        place(track, x, at, g)
    track = track[:int(T * SR)]
    pk = float(np.max(np.abs(track)) or 1)
    if pk > 0.95: track *= 0.95 / pk
    tmp = f"/tmp/sfx_{name}.wav"
    wavfile.write(tmp, SR, (track * 32767).astype(np.int16))
    fc, ins = None, ["-i", vin, "-i", tmp]
    if base and base != "none":
        ins = ["-i", vin, "-i", tmp, "-i", base]; k = float(keep)
        fc = (f"[2:a]atrim=0:{k},asetpts=PTS-STARTPTS,afade=t=out:st={k-0.4:.2f}:d=0.4,aformat=sample_rates=44100:channel_layouts=stereo,apad=whole_dur={T}[b];"
              f"[1:a]aformat=sample_rates=44100:channel_layouts=stereo[s];[b][s]amix=inputs=2:normalize=0:duration=longest,atrim=0:{T},afade=t=out:st={T-1.0:.2f}:d=1.0[aout]")
    elif base == "none":
        fc = f"[1:a]aformat=sample_rates=44100:channel_layouts=stereo,afade=t=out:st={T-0.6:.2f}:d=0.6[aout]"
    else:
        fc = (f"[0:a]aformat=sample_rates=44100:channel_layouts=stereo[b];[1:a]aformat=sample_rates=44100:channel_layouts=stereo[s];"
              f"[b][s]amix=inputs=2:normalize=0:duration=first,atrim=0:{T}[aout]")
    subprocess.run(["ffmpeg","-v","error","-y",*ins,"-filter_complex",fc,"-map","0:v","-map","[aout]","-c:v","copy","-c:a","aac","-b:a","160k","-t",f"{T}",out],check=True)
    print(out, round(dur(out), 3))
main()
