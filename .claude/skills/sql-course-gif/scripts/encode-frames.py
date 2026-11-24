"""Encode screenshot PNGs on one shared palette with explicit GIF delays."""
import argparse
import json
from pathlib import Path

from PIL import Image


def encode(folder: Path, out: Path):
    timeline = json.loads((folder / 'frames.json').read_text(encoding='utf-8'))
    if not timeline or any(not isinstance(ms, int) or ms < 10 or ms % 10 for ms in timeline):
        raise ValueError('Frame delays must be positive multiples of 10 ms')
    sample_count = min(16, len(timeline))
    palette_sample = Image.new('RGB', (256, 192 * sample_count))
    for position in range(sample_count):
        index = round(position * (len(timeline) - 1) / max(1, sample_count - 1))
        with Image.open(folder / f'{index}.png') as frame:
            sample = frame.convert('RGB').resize((256, 192), Image.Resampling.NEAREST)
            palette_sample.paste(sample, (0, position * 192))
    palette = palette_sample.quantize(colors=256, method=Image.Quantize.MEDIANCUT)

    def frames():
        for index in range(len(timeline)):
            with Image.open(folder / f'{index}.png') as frame:
                yield frame.convert('RGB').quantize(palette=palette, dither=Image.Dither.NONE)

    sequence = frames()
    first = next(sequence)
    first.save(out, save_all=True, append_images=sequence, duration=timeline, loop=0, disposal=1)
    with Image.open(out) as gif:
        total = 0
        for index in range(gif.n_frames):
            gif.seek(index)
            total += gif.info['duration']
        if total != sum(timeline):
            raise ValueError(f'Encoded duration {total} ms differs from planned {sum(timeline)} ms')


if __name__ == '__main__':
    args = argparse.ArgumentParser()
    args.add_argument('folder', type=Path)
    args.add_argument('out', type=Path)
    options = args.parse_args()
    encode(options.folder, options.out)
