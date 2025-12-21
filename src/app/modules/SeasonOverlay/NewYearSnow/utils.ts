import { CanvasTexture, MathUtils } from 'three';

const SNOW_COUNT = 700;
const TYPES_COUNT = 4;

export const snowTextures = Array.from({ length: TYPES_COUNT }).map(() => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new CanvasTexture(canvas);

  ctx.translate(128, 128);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';

  for (let i = 0; i < 6; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI) / 3);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -100);
    ctx.stroke();
    for (let j = 1; j <= 3; j++) {
      const bp = -j * 25;
      const bl = 10 + Math.random() * 30;
      ctx.beginPath();
      ctx.moveTo(0, bp);
      ctx.lineTo(bl, bp - 10);
      ctx.moveTo(0, bp);
      ctx.lineTo(-bl, bp - 10);
      ctx.stroke();
    }
    ctx.restore();
  }
  const tex = new CanvasTexture(canvas);
  tex.anisotropy = 16;
  return tex;
});

export const snowGroups = Array.from({ length: TYPES_COUNT }, () =>
  Array.from({ length: Math.floor(SNOW_COUNT / TYPES_COUNT) }, () => ({
    t: Math.random() * 100,
    speed: 0.009 + Math.random() / 50,
    xFactor: MathUtils.randFloatSpread(40),
    yFactor: MathUtils.randFloatSpread(20),
    zFactor: MathUtils.randFloatSpread(15),
    spin: MathUtils.randFloat(0.5, 2),
    size: 0.18 + (Math.random() + Math.random()) / 25
  }))
);
