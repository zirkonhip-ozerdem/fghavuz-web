const COLORS = ["#38bdf8", "#0ea5e9", "#0284c7", "#7dd3fc", "#bae6fd"];

type Drop = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  gravity: number;
  drag: number;
};

function drawDroplet(ctx: CanvasRenderingContext2D, size: number, color: string) {
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.bezierCurveTo(size * 0.62, -size * 0.15, size * 0.62, size * 0.62, 0, size * 0.78);
  ctx.bezierCurveTo(-size * 0.62, size * 0.62, -size * 0.62, -size * 0.15, 0, -size);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(-size * 0.2, size * 0.05, size * 0.16, size * 0.24, -0.4, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
  ctx.fill();
}

export function launchWaterDrops(count = 130) {
  if (typeof window === "undefined") return;

  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  document.body.appendChild(canvas);

  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }
  ctx.scale(dpr, dpr);

  const drops: Drop[] = Array.from({length: count}, () => ({
    x: Math.random() * width,
    y: -20 - Math.random() * height * 0.4,
    vx: (Math.random() - 0.5) * 1,
    vy: Math.random() * 0.5 + 0.25,
    size: Math.random() * 7 + 6,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    gravity: 0.026 + Math.random() * 0.015,
    drag: 0.996,
  }));

  const duration = 6800;
  const start = performance.now();
  let frameId: number;

  function frame(now: number) {
    const elapsed = now - start;
    ctx!.clearRect(0, 0, width, height);

    for (const drop of drops) {
      drop.vy += drop.gravity;
      drop.vx *= drop.drag;
      drop.x += drop.vx;
      drop.y += drop.vy;

      const fadeStart = duration - 600;
      const opacity = elapsed > fadeStart ? Math.max(0, 1 - (elapsed - fadeStart) / 600) : 1;
      const rotation = Math.atan2(drop.vx, drop.vy);

      ctx!.save();
      ctx!.globalAlpha = opacity;
      ctx!.translate(drop.x, drop.y);
      ctx!.rotate(rotation);
      drawDroplet(ctx!, drop.size, drop.color);
      ctx!.restore();
    }

    if (elapsed < duration) {
      frameId = requestAnimationFrame(frame);
    } else {
      cancelAnimationFrame(frameId);
      canvas.remove();
    }
  }

  frameId = requestAnimationFrame(frame);
}
