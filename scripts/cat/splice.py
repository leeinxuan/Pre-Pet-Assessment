#!/usr/bin/env python3
"""Splice segments with crossfades into one 1280x720 mp4.

usage: splice.py OUT.mp4 [--xf 0.25] SRC:START:DUR [SRC:START:DUR ...]
Every segment is scaled to 1280x720 @30fps; audio is crossfaded too.
"""
import subprocess, sys

args = sys.argv[1:]
out = args.pop(0)
xf = 0.25
if args and args[0] == "--xf":
    args.pop(0)
    xf = float(args.pop(0))
segs = []
for a in args:
    src, st, du = a.rsplit(":", 2)
    segs.append((src, float(st), float(du)))

inputs, fc = [], []
for i, (src, st, du) in enumerate(segs):
    inputs += ["-i", src]
    fc.append(f"[{i}:v]trim={st}:{st+du},setpts=PTS-STARTPTS,scale=1280:720,fps=30,format=yuv420p[v{i}]")
    fc.append(f"[{i}:a]atrim={st}:{st+du},asetpts=PTS-STARTPTS,aresample=44100,aformat=channel_layouts=stereo[a{i}]")

vlast, alast, t = "v0", "a0", segs[0][2]
for i in range(1, len(segs)):
    fc.append(f"[{vlast}][v{i}]xfade=transition=fade:duration={xf}:offset={t-xf:.3f}[vx{i}]")
    fc.append(f"[{alast}][a{i}]acrossfade=d={xf}[ax{i}]")
    vlast, alast = f"vx{i}", f"ax{i}"
    t += segs[i][2] - xf

cmd = ["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", ";".join(fc),
       "-map", f"[{vlast}]", "-map", f"[{alast}]", "-c:v", "libx264", "-crf", "18",
       "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k", out]
subprocess.run(cmd, check=True)
print("ok", round(t, 2), "s")
