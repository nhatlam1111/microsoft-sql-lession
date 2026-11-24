"""Decode one GIF, inspect timing and optionally export a contact sheet at exact times."""
import argparse
import hashlib
from pathlib import Path
from PIL import Image, ImageDraw

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("gif", type=Path)
parser.add_argument("--times", help="Comma-separated timestamps in milliseconds")
parser.add_argument("--sheet", type=Path, help="Output contact sheet PNG for --times")
parser.add_argument("--expect-ms", type=int, help="Compare decoded duration with the authored timeline")
args = parser.parse_args()
if bool(args.times) != bool(args.sheet):
    parser.error("--times and --sheet must be used together")
times = [int(s) for s in args.times.split(",")] if args.times else []
if any(t < 0 for t in times):
    parser.error("timestamps must be nonnegative")
with Image.open(args.gif) as gif:
    if gif.format != "GIF" or gif.info.get("loop") != 0:
        raise ValueError("Expected an infinitely looping GIF")
    elapsed = 0
    hashes = set()
    frames = {}
    for i in range(gif.n_frames):
        gif.seek(i)
        delay = gif.info.get("duration", 0)
        if delay <= 0:
            raise ValueError(f"Frame {i} has no positive duration")
        rgb = gif.convert("RGB")
        hashes.add(hashlib.sha256(rgb.tobytes()).digest())
        for t in times:
            if elapsed <= t < elapsed + delay:
                thumb = rgb.copy()
                thumb.thumbnail((440, 340))
                frames[t] = (i, thumb)
        elapsed += delay
    if len(hashes) < 2 or (args.expect_ms is not None and elapsed != args.expect_ms):
        raise ValueError(f"Check motion/timing: {len(hashes)} different images, {elapsed} ms")
    print(f"{gif.width}x{gif.height}, {gif.n_frames} decoded frames, {len(hashes)} distinct, {elapsed} ms")
if times:
    if len(frames) != len(set(times)):
        parser.error(f"all timestamps must be below {elapsed} ms")
    width, height = frames[times[0]][1].size
    columns = min(3, len(times))
    sheet = Image.new("RGB", (columns*width, ((len(times)+columns-1)//columns)*(height+22)), "#131024")
    draw = ImageDraw.Draw(sheet)
    for n,t in enumerate(times):
        i,img = frames[t]
        x,y = n%columns*width, n//columns*(height+22)
        sheet.paste(img,(x,y))
        draw.text((x+4,y+height+3), f"{t} ms | f{i}", fill="white")
    sheet.save(args.sheet)

