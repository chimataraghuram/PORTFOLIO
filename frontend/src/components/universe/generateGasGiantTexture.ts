import * as THREE from 'three';

/** Procedural equirectangular Jupiter-style gas giant texture */
export function createGasGiantTexture(): THREE.CanvasTexture {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const bands: [number, string][] = [
    [0, '#1a1030'],
    [0.08, '#4a2c5a'],
    [0.16, '#c47b4a'],
    [0.24, '#e8a86a'],
    [0.32, '#d4a574'],
    [0.4, '#8b5a6b'],
    [0.48, '#5c3d6e'],
    [0.56, '#9a6b8a'],
    [0.64, '#6b4a7a'],
    [0.72, '#3d2858'],
    [0.8, '#7a4a8a'],
    [0.88, '#2a1840'],
    [1, '#120818'],
  ];

  for (let y = 0; y < h; y++) {
    const t = y / h;
    let color = bands[0][1];
    for (let i = 1; i < bands.length; i++) {
      if (t <= bands[i][0]) {
        const t0 = bands[i - 1][0];
        const t1 = bands[i][0];
        const mix = (t - t0) / (t1 - t0 || 1);
        color = lerpColor(bands[i - 1][1], bands[i][1], mix);
        break;
      }
    }
    const grad = ctx.createLinearGradient(0, y, w, y);
    grad.addColorStop(0, color);
    grad.addColorStop(0.5, shiftBrightness(color, 1.08));
    grad.addColorStop(1, shiftBrightness(color, 0.92));
    ctx.fillStyle = grad;
    ctx.fillRect(0, y, w, 1);
  }

  /* Great Red Spot–style storm */
  ctx.globalAlpha = 0.35;
  const spot = ctx.createRadialGradient(w * 0.62, h * 0.55, 0, w * 0.62, h * 0.55, w * 0.12);
  spot.addColorStop(0, '#8b3040');
  spot.addColorStop(1, 'transparent');
  ctx.fillStyle = spot;
  ctx.beginPath();
  ctx.ellipse(w * 0.62, h * 0.55, w * 0.09, h * 0.05, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  /* Subtle noise */
  const img = ctx.getImageData(0, 0, w, h);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 12;
    img.data[i] = clamp(img.data[i] + n);
    img.data[i + 1] = clamp(img.data[i + 1] + n);
    img.data[i + 2] = clamp(img.data[i + 2] + n);
  }
  ctx.putImageData(img, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function clamp(v: number) {
  return Math.max(0, Math.min(255, v));
}

function lerpColor(a: string, b: string, t: number): string {
  const pa = hexToRgb(a);
  const pb = hexToRgb(b);
  const r = Math.round(pa.r + (pb.r - pa.r) * t);
  const g = Math.round(pa.g + (pb.g - pa.g) * t);
  const bl = Math.round(pa.b + (pb.b - pa.b) * t);
  return `rgb(${r},${g},${bl})`;
}

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function shiftBrightness(hex: string, factor: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${clamp(r * factor)},${clamp(g * factor)},${clamp(b * factor)})`;
}
