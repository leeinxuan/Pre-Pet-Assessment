#!/usr/bin/env python3
import subprocess, os, sys
H = os.path.dirname(os.path.abspath(__file__)); CAT = os.path.join(H, '..', 'cat')
CL = lambda n: f"{H}/videos/clips/{n}.mp4"
SH = '/'.join([H, '..', '..'])  # unused
SHIBA = os.path.expanduser('~/mnt/Pre-Pet-Assessment/public/assets/dog/pet-journey/shiba/')
V = f"{H}/videos"; os.makedirs(f"{V}/_tmp", exist_ok=True)
names = ['00_correct-answer','01_correct-answer2','02_first-day','03_sick_fixed','04_nocturnal','05_solitary-s1','06_solitary-s2','07_picky-eating','08_arrival-s2','09_arrival-s4','10_arrival-s5','11_arrival-s6','12_busyday-s2','13_busyday-s4','14_busyday-s5','15_aging-s1','16_aging-s2','17_aging-s3','18_aging-s4','19_daily-s2','20_daily-s3','21_senior-s1','22_senior-s2','23_senior-s3','24_senior-s4','v2_busyday-s2','v2_busyday-s4','v2_busyday-s5','v2_daily-s3','v2_picky-eating','v2_nocturnal','v3_picky-eating','v2_daily-s3_fixed']
c = lambda i: CL(names[i])
# name: (parts, keep(♻️) )
J = {
 'correct-answer': ([(c(0),0,5)],0),
 'correct-answer2': ([(c(1),0,5)],0),
 'first-day': ([(c(2),0,8)],0),
 'sick': ([(c(3),0,8)],0),
 'nocturnal': ([(c(30),0,7)],0),
 'solitary': ([(c(5),0,4),(c(6),0,3.5)],0),
 'picky-eating': ([(c(31),0,9.5)],0),
 'arrival-transition': ([(SHIBA+'arrival-transition.mp4',0,1.2),(c(8),0,2.5),(SHIBA+'arrival-transition.mp4',3.33,1.57),(c(9),0,2.6),(c(10),0,2.6),(c(11),0,2.5)],0),
 'busy-day-transition': ([(SHIBA+'busy-day-transition.mp4',0,4.5),(c(25),0,3.0),(c(26),3.5,2.5),(c(27),0,3.5)],4.5),
 'time-passes-aging': ([(c(15),0.5,2.7),(c(16),0,2.7),(c(17),0,2.7),(c(18),0,3.0)],0),
 'busy-daily-care': ([(SHIBA+'busy-daily-care.mp4',0,4.0),(c(19),0,3.2),(c(32),0,3.2)],4.0),
 'senior-life': ([(c(21),0,2.3),(c(22),0,2.6),(c(23),0,2.6),(c(24),0,2.8)],0),
}
BED = {'solitary':'solitary'}
def sh(*a): subprocess.run(a, check=True)
def mean(f):
    r = subprocess.run(["ffmpeg","-i",f,"-af","volumedetect","-f","null","-"],capture_output=True,text=True).stderr
    return float([l for l in r.splitlines() if "mean_volume" in l][0].split(":")[1].split()[0])
def dur(f): return float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f]).decode())

STICKER = os.path.expanduser('~/mnt/Pre-Pet-Assessment/scripts/歡迎回家繽紛泡泡字貼紙.png')
MEM = ("eq=saturation=0.72:contrast=0.92:brightness=0.03,colorbalance=rs=.08:gs=.03:bs=-.10:rm=.06:bm=-.08,"
       "split[a][b];[b]gblur=sigma=7[bl];[a][bl]blend=all_mode=screen:all_opacity=0.30,vignette=PI/3.5,noise=alls=9:allf=t,fade=t=in:d=0.7:color=white")
def post(n, tmp, T):
    fx = f"{V}/_tmp/{n}_fx.mp4"
    if n == 'time-passes-aging':
        t0 = 6.9; d = 1.1
        fc = ("[0:v]split[c][f0];[f0]eq=saturation=0.95:contrast=0.97:brightness=0.03,"
              "colorbalance=rs=.10:gs=.05:bs=-.14:rm=.08:bm=-.10,split[fa][fb];[fb]gblur=sigma=8[fbl];"
              "[fa][fbl]blend=all_mode=screen:all_opacity=0.22,vignette=PI/5,noise=alls=4:allf=t,fade=t=in:d=0.5:color=white[F];"
              f"[F][c]blend=all_expr='A*(1-min(max((T-{t0})/{d},0),1))+B*min(max((T-{t0})/{d},0),1)'[v]")
        sh('ffmpeg','-v','error','-y','-i',tmp,'-filter_complex',fc,'-map','[v]','-c:v','libx264','-crf','23','-pix_fmt','yuv420p','-an',fx); return fx
    if n == 'arrival-transition':
        st = T-2.6
        fc = f"[1:v]scale=340:-1,format=rgba,fade=in:st={st}:d=0.5:alpha=1[s];[0:v][s]overlay=710:55:enable='gte(t,{st})'[v]"
        sh('ffmpeg','-v','error','-y','-i',tmp,'-loop','1','-i',STICKER,'-filter_complex',fc,'-map','[v]','-c:v','libx264','-crf','18','-pix_fmt','yuv420p','-t',str(T),'-an',fx); return fx
    return tmp
only = sys.argv[1:] or list(J)
for n in only:
    parts, keep = J[n]; tmp = f"{V}/_tmp/{n}.mp4"; bed = f"{H}/music/music_{BED.get(n,n)}.wav"; out = f"{V}/hamster_{n}_v3.mp4"
    if len(parts)==1: sh('ffmpeg','-v','error','-y','-ss',str(parts[0][1]),'-t',str(parts[0][2]),'-i',parts[0][0],'-vf','scale=1280:720,fps=30','-c:v','libx264','-crf','18','-pix_fmt','yuv420p','-c:a','aac',tmp)
    else: sh('python3',f'{CAT}/splice.py',tmp,'--xf','0.25',*[f"{p}:{s}:{d}" for p,s,d in parts])
    T = dur(tmp); tmp = post(n, tmp, T)
    if keep>0:
        xf=0.8; g = -21 - mean(bed)
        kseg=f"{V}/_tmp/{n}_keep.wav"; sh('ffmpeg','-v','error','-y','-i',tmp,'-t',str(keep),'-vn',kseg)
        kg = max(0, min(14, -24 - mean(kseg)))
        fc=(f"[0:a]atrim=0:{keep+xf},asetpts=PTS-STARTPTS,aformat=sample_rates=44100:channel_layouts=stereo,volume={kg}dB[k];"
            f"[1:a]aformat=sample_rates=44100:channel_layouts=stereo,volume={g}dB,atrim=0:{T-keep+0.3},asetpts=PTS-STARTPTS[m];"
            f"[k][m]acrossfade=d={xf}:c1=tri:c2=tri,atrim=0:{T},asetpts=PTS-STARTPTS,afade=t=out:st={T-1.2:.2f}:d=1.2,alimiter=limit=0.8:level=0[a]")
        sh('ffmpeg','-v','error','-y','-i',tmp,'-i',bed,'-filter_complex',fc,'-map','0:v','-map','[a]','-c:v','libx264','-crf','19','-pix_fmt','yuv420p','-c:a','aac','-b:a','160k','-t',str(T),out)
    else:
        g = -21 - mean(bed)
        fc = f"[1:a]volume={g}dB,atrim=0:{T},afade=t=in:d=0.5,afade=t=out:st={T-1.2:.2f}:d=1.2,apad=whole_dur={T},alimiter=limit=0.8:level=0[a]"
        sh('ffmpeg','-v','error','-y','-i',tmp,'-i',bed,'-filter_complex',fc,'-map','0:v','-map','[a]','-c:v','libx264','-crf','19','-pix_fmt','yuv420p','-c:a','aac','-b:a','160k','-t',str(T),out)
    r = subprocess.run(["ffmpeg","-i",out,"-af","volumedetect","-f","null","-"],capture_output=True,text=True).stderr
    vd = [l.split(']')[1].strip() for l in r.splitlines() if 'mean_volume' in l or 'max_volume' in l]
    sz = subprocess.check_output(["ffprobe","-v","error","-select_streams","v","-show_entries","stream=width,height","-of","csv=p=0",out]).decode().strip()
    print(n, round(dur(out),2), sz, vd, flush=True)
