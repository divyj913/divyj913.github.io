// Cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
if (cursor && ring) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });
  function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();
  document.querySelectorAll('a,button,.vid-card,.price-card,.bonus-card,.deliv-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('expand');
      ring.classList.add('expand');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('expand');
      ring.classList.remove('expand');
    });
  });
}

// Hero canvas
(function () {
  const c = document.getElementById('heroCanvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  let w, h, t = 0;
  function resize() {
    w = c.width = c.offsetWidth;
    h = c.height = c.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  const tracks = [
    { y: 0.35, segs: [{ s: 0.05, e: 0.3, col: '#e8c97a' }, { s: 0.35, e: 0.65, col: '#c8824a' }, { s: 0.7, e: 0.95, col: '#e8c97a' }] },
    { y: 0.45, segs: [{ s: 0.1, e: 0.45, col: '#888880' }, { s: 0.5, e: 0.9, col: '#666660' }] },
    { y: 0.55, segs: [{ s: 0.02, e: 0.2, col: '#444440' }, { s: 0.25, e: 0.55, col: '#e8c97a' }, { s: 0.6, e: 0.8, col: '#444440' }] },
    { y: 0.63, segs: [{ s: 0.08, e: 0.38, col: '#666660' }, { s: 0.44, e: 0.72, col: '#c8824a' }] },
  ];
  const waveData = Array.from({ length: 80 }, () => Math.random());
  function draw() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const gridCol = isLight ? 'rgba(23, 22, 20, 0.04)' : 'rgba(240, 237, 230, 0.04)';
    const dashCol = isLight ? 'rgba(179, 143, 67, 0.6)' : 'rgba(212, 180, 110, 0.6)';
    const trackCol = isLight ? 'rgba(23, 22, 20, 0.03)' : 'rgba(240, 237, 230, 0.03)';
    const waveCol = isLight ? 'rgba(179, 143, 67, 0.25)' : 'rgba(212, 180, 110, 0.25)';

    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = gridCol;
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    const ph = (Math.sin(t * 0.3) * 0.15 + 0.5) * w;
    ctx.strokeStyle = dashCol;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(ph, 0);
    ctx.lineTo(ph, h);
    ctx.stroke();
    ctx.setLineDash([]);
    tracks.forEach(track => {
      const ty = track.y * h;
      ctx.fillStyle = trackCol;
      ctx.fillRect(0, ty - 8, w, 16);
      track.segs.forEach(seg => {
        const sx = seg.s * w, ex = seg.e * w;
        let col = seg.col;
        if (col === '#e8c97a') col = isLight ? '#b38f43' : '#e8c97a';
        else if (col === '#c8824a') col = isLight ? '#9b7732' : '#c8824a';
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.18;
        ctx.fillRect(sx, ty - 6, ex - sx, 12);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = col;
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = 0.5;
        ctx.strokeRect(sx, ty - 6, ex - sx, 12);
        ctx.globalAlpha = 1;
      });
    });
    const wTop = h * 0.72, wH = h * 0.18;
    waveData.forEach((v, i) => {
      const x = (i / waveData.length) * w;
      const bh = v * wH * (0.5 + 0.5 * Math.sin(t * 1.5 + i * 0.3));
      ctx.fillStyle = waveCol;
      ctx.fillRect(x, wTop + wH / 2 - bh / 2, w / waveData.length - 1, bh);
    });
    t += 0.016;
    requestAnimationFrame(draw);
  }
  draw();
})();

// About canvas
(function () {
  const c = document.getElementById('aboutCanvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  let w, h, t = 0;
  function resize() {
    w = c.width = c.offsetWidth;
    h = c.height = c.offsetHeight;
  }
  resize();
  new ResizeObserver(resize).observe(c);
  const pts = Array.from({ length: 6 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.003,
    vy: (Math.random() - 0.5) * 0.003
  }));
  function draw() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const bgCol = isLight ? '#F3F0E8' : '#111111';
    const gridCol = isLight ? 'rgba(23, 22, 20, 0.05)' : 'rgba(240, 237, 230, 0.05)';
    const lineCol = isLight ? '179, 143, 67' : '212, 180, 110';
    const dotCol = isLight ? 'rgba(179, 143, 67, 0.5)' : 'rgba(212, 180, 110, 0.5)';
    const waveCol = isLight ? 'rgba(155, 119, 50, 0.4)' : 'rgba(200, 130, 74, 0.4)';

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = bgCol;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = gridCol;
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    pts.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > 1) p.vx *= -1;
      if (p.y < 0 || p.y > 1) p.vy *= -1;
    });
    pts.forEach((a, i) => {
      pts.forEach((b, j) => {
        if (j <= i) return;
        const dx = (a.x - b.x) * w, dy = (a.y - b.y) * h, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          ctx.strokeStyle = `rgba(${lineCol},${0.15 * (1 - dist / 200)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(a.x * w, a.y * h);
          ctx.lineTo(b.x * w, b.y * h);
          ctx.stroke();
        }
      });
      ctx.fillStyle = dotCol;
      ctx.beginPath();
      ctx.arc(a.x * w, a.y * h, 2, 0, Math.PI * 2);
      ctx.fill();
    });
    const wTop = h * 0.6;
    ctx.strokeStyle = waveCol;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const y = wTop + Math.sin(x * 0.04 + t) * 20 + Math.sin(x * 0.08 + t * 1.3) * 10;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    t += 0.02;
    requestAnimationFrame(draw);
  }
  draw();
})();

// Waveform bars
const wf = document.getElementById('waveform');
if (wf) {
  [18, 28, 40, 35, 24, 44, 30, 22, 38, 44, 28, 32, 20, 42, 36, 26, 44, 32, 18, 38, 24, 30].forEach((h, i) => {
    const bar = document.createElement('div');
    bar.className = 'wave-bar';
    bar.style.height = h + 'px';
    bar.style.animationDelay = (i * 0.06) + 's';
    wf.appendChild(bar);
  });
}

// Scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(r => obs.observe(r));

// Parallax hero
window.addEventListener('scroll', () => {
  const heroC = document.getElementById('heroCanvas');
  if (heroC) heroC.style.transform = `translateY(${window.scrollY * 0.3}px)`;
});

// Theme toggling scripting logic
const themeToggleBtn = document.getElementById('themeToggle');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('divy-theme', newTheme);
  });
}
