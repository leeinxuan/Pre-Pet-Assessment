#!/usr/bin/env python3
"""Replace a spliced video's audio with ONE continuous music bed.

usage: unify_audio.py IN.mp4 OUT.mp4 BED_START BED_DUR [--xf 0.8] [--vol 1.0]

The bed is cut from the video's own audio (BED_START .. BED_START+BED_DUR), looped with
crossfades to cover the whole video, then faded in/out. Video stream is copied untouched.
Use it for multi-shot videos where each Vids clip came with different background music.
"""
import subprocess, sys

a = sys.argv[1:]
src, out, st, du = a[0], a[1], float(a[2]), float(a[3])
xf, vol = 0.8, 1.0
if "--xf" in a: xf = float(a[a.index("--xf") + 1])
if "--vol" in a: vol = float(a[a.index("--vol") + 1])

total = float(subprocess.check_output(
    ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", src]).decode())
n = 1
while du * n - xf * (n - 1) < total + 0.5:
    n += 1

fc = [f"[0:a]atrim={st}:{st+du},asetpts=PTS-STARTPTS,aresample=44100,aformat=channel_layouts=stereo,asplit={n}" +
      "".join(f"[b{i}]" for i in range(n))]
last = "b0"
for i in range(1, n):
    fc.append(f"[{last}][b{i}]acrossfade=d={xf}[c{i}]")
    last = f"c{i}"
fc.append(f"[{last}]atrim=0:{total},asetpts=PTS-STARTPTS,volume={vol},"
          f"afade=t=in:st=0:d=0.3,afade=t=out:st={total-1.0:.2f}:d=1.0[aout]")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-filter_complex", ";".join(fc),
                "-map", "0:v", "-map", "[aout]", "-c:v", "copy", "-c:a", "aac", "-b:a", "160k",
                "-t", f"{total}", out], check=True)
print("ok", src, "->", out, f"(bed {st}-{st+du}s x{n})")
