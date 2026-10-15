#!/usr/bin/env python3
"""Per-shot audio: keep a video's ORIGINAL sound for the first KEEP_END seconds
(typing, sighs, car...), then continue with ONE long non-looping slice of the
Lyria bed (music/lyria-bed.wav) for the rest, crossfaded.

usage: mix_music.py VIDEO_SRC AUDIO_SRC OUT.mp4 BED_START KEEP_END [--bed music/xxx-bed.wav] [--xf 0.8] [--db -8]
  VIDEO_SRC : file whose video stream is used (copied)
  AUDIO_SRC : file whose ORIGINAL audio is kept for 0..KEEP_END (same duration)
  BED_START : second of lyria-bed.wav to start the music slice at
  KEEP_END  : 0 = music for the whole video
"""
import subprocess, sys, os
a = sys.argv[1:]
vsrc, asrc, out, bst, keep = a[0], a[1], a[2], float(a[3]), float(a[4])
xf = float(a[a.index("--xf")+1]) if "--xf" in a else 0.8
db = float(a[a.index("--db")+1]) if "--db" in a else None
bed = a[a.index("--bed")+1] if "--bed" in a else os.path.join(os.path.dirname(os.path.abspath(__file__)), "music", "lyria-bed.wav")
def dur(f): return float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f]).decode())
def mean(f):
    r = subprocess.run(["ffmpeg","-i",f,"-af","volumedetect","-f","null","-"],capture_output=True,text=True).stderr
    return float([l for l in r.splitlines() if "mean_volume" in l][0].split(":")[1].split()[0])
T = dur(vsrc)
if db is None: db = mean(asrc) - mean(bed) + 1.0   # match original loudness (+1 dB)
fo = f"afade=t=out:st={T-1.2:.2f}:d=1.2"
if keep <= 0:
    fc = f"[1:a]atrim={bst}:{bst+T+0.1},asetpts=PTS-STARTPTS,aformat=sample_rates=44100:channel_layouts=stereo,volume={db}dB,afade=t=in:st=0:d=0.5,atrim=0:{T},{fo}[aout]"
else:
    fc = (f"[0:a]atrim=0:{keep+xf},asetpts=PTS-STARTPTS,aformat=sample_rates=44100:channel_layouts=stereo[k];"
          f"[1:a]atrim={bst}:{bst+T-keep+0.2},asetpts=PTS-STARTPTS,aformat=sample_rates=44100:channel_layouts=stereo,volume={db}dB[m];"
          f"[k][m]acrossfade=d={xf}:c1=tri:c2=tri,atrim=0:{T},asetpts=PTS-STARTPTS,{fo}[aout]")
subprocess.run(["ffmpeg","-v","error","-y","-i",asrc,"-i",bed,"-i",vsrc,"-filter_complex",fc,"-map","2:v","-map","[aout]","-c:v","copy","-c:a","aac","-b:a","160k","-t",f"{T}",out],check=True)
print(out, "dur", dur(out), "music gain dB", round(db,1))
