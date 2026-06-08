// 1. Refined Custom Cursor with Lagging Ring
(function() {
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
      // Smooth interpolation (lerp) for the lagging ring
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    }
    animRing();
    
    // Add hover states for all interactive elements
    const interactiveSelectors = 'a, button, .vid-card, .price-card, .bonus-card, .deliv-card, .service-card, input, textarea, label';
    
    // Use event delegation or dynamically check elements
    document.addEventListener('mouseover', e => {
      if (e.target.closest(interactiveSelectors)) {
        cursor.classList.add('expand');
        ring.classList.add('expand');
      }
    });
    
    document.addEventListener('mouseout', e => {
      if (!e.target.closest(interactiveSelectors)) {
        cursor.classList.remove('expand');
        ring.classList.remove('expand');
      }
    });
  }
})();

// 2. Navigation Shrinking and Glassmorphic Scroll Effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    if (window.scrollY > 50) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  }
});

// 3. Interactive Drifting Glow Blobs (Mouse reactive)
(function() {
  const container = document.querySelector('.glow-blob-container');
  if (!container) return;
  
  const blobs = container.querySelectorAll('.glow-blob');
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40; // max shift 20px
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    
    blobs.forEach((blob, idx) => {
      const factor = (idx + 1) * 0.5; // different speed
      blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });
})();

// 4. Hero Wave & Grid Visual (Canvas replacement for high performance and sleek aesthetics)
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
  
  // Sine-wave bars properties
  const barCount = 45;
  const bars = Array.from({ length: barCount }, () => Math.random());
  
  function draw() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    ctx.clearRect(0, 0, w, h);
    
    const themeAccent = isLight ? 'rgba(163, 124, 47, ' : 'rgba(212, 180, 110, ';
    const themeSecondary = isLight ? 'rgba(79, 70, 229, ' : 'rgba(99, 102, 241, ';
    
    // Draw coordinates horizontal tracking line
    const trackingY = h * 0.55;
    ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, trackingY);
    ctx.lineTo(w, trackingY);
    ctx.stroke();
    
    // Draw animated center pulse marker
    const markerX = (Math.sin(t * 0.4) * 0.2 + 0.5) * w;
    ctx.strokeStyle = isLight ? 'rgba(79, 70, 229, 0.4)' : 'rgba(99, 102, 241, 0.4)';
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.moveTo(markerX, 0);
    ctx.lineTo(markerX, h);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw soundwave columns on the tracking line
    const waveWidth = w * 0.8;
    const waveStart = (w - waveWidth) / 2;
    const barWidth = waveWidth / barCount;
    
    bars.forEach((v, i) => {
      const barX = waveStart + i * barWidth;
      const waveVal = Math.sin(t * 1.5 + i * 0.25) * Math.cos(t * 0.5 + i * 0.1);
      const amp = v * 90 * (0.3 + 0.7 * Math.abs(waveVal));
      
      const grad = ctx.createLinearGradient(barX, trackingY - amp/2, barX, trackingY + amp/2);
      grad.addColorStop(0, themeSecondary + '0.6)');
      grad.addColorStop(0.5, themeAccent + '0.8)');
      grad.addColorStop(1, themeSecondary + '0.6)');
      
      ctx.fillStyle = grad;
      ctx.fillRect(barX + 2, trackingY - amp/2, barWidth - 4, amp);
    });
    
    t += 0.015;
    requestAnimationFrame(draw);
  }
  draw();
  
  // Parallax Canvas translation
  window.addEventListener('scroll', () => {
    c.style.transform = `translateY(${window.scrollY * 0.25}px)`;
  });
})();

// 5. About Network Node Visual (Canvas visual)
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
  
  const nodes = Array.from({ length: 14 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.0015,
    vy: (Math.random() - 0.5) * 0.0015,
    r: Math.random() * 2 + 1
  }));
  
  function draw() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    ctx.clearRect(0, 0, w, h);
    
    const nodeColor = isLight ? 'rgba(79, 70, 229, 0.45)' : 'rgba(99, 102, 241, 0.45)';
    const lineColor = isLight ? '79, 70, 229' : '99, 102, 241';
    
    nodes.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > 1) p.vx *= -1;
      if (p.y < 0 || p.y > 1) p.vy *= -1;
    });
    
    // Draw connection lines
    nodes.forEach((a, i) => {
      nodes.forEach((b, j) => {
        if (j <= i) return;
        const dx = (a.x - b.x) * w;
        const dy = (a.y - b.y) * h;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 180) {
          const alpha = 0.2 * (1 - dist / 180);
          ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x * w, a.y * h);
          ctx.lineTo(b.x * w, b.y * h);
          ctx.stroke();
        }
      });
      
      ctx.fillStyle = nodeColor;
      ctx.beginPath();
      ctx.arc(a.x * w, a.y * h, a.r, 0, Math.PI * 2);
      ctx.fill();
    });
    
    requestAnimationFrame(draw);
  }
  draw();
})();

// 6. Audio Waveform Bar Initializer (About Page)
const wf = document.getElementById('waveform');
if (wf) {
  const barsData = [16, 26, 42, 34, 20, 46, 28, 18, 38, 48, 26, 30, 16, 44, 38, 22, 46, 30, 14, 38, 22, 28, 16, 34];
  barsData.forEach((h, i) => {
    const bar = document.createElement('div');
    bar.className = 'wave-bar';
    bar.style.height = h + 'px';
    bar.style.animationDelay = (i * 0.05) + 's';
    wf.appendChild(bar);
  });
}

// 7. Scroll Reveal Observer
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(r => revealObserver.observe(r));

// 8. Theme Toggling Logic
const themeToggleBtn = document.getElementById('themeToggle');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('divy-theme', newTheme);
  });
}

// 9. Inquiry Form Submission Handling (Web3Forms)
const auditForm = document.getElementById('auditForm');
const formStatus = document.getElementById('formStatus');
if (auditForm && formStatus) {
  auditForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const keyInput = document.getElementById('web3forms_key');
    const isCall = document.getElementById('typeCall')?.checked;
    
    if (keyInput && keyInput.value === 'YOUR_ACCESS_KEY_HERE') {
      formStatus.innerText = isCall 
        ? "Success! Call Request Received. (Mock Submission - Please replace YOUR_ACCESS_KEY_HERE with your Web3Forms key)"
        : "Success! Audit Application Received. (Mock Submission - Please replace YOUR_ACCESS_KEY_HERE with your Web3Forms key)";
      formStatus.style.display = 'block';
      formStatus.style.color = 'var(--c-accent)';
      auditForm.reset();
      return;
    }
    
    formStatus.innerText = isCall ? "Sending your call request..." : "Submitting your application...";
    formStatus.style.display = 'block';
    formStatus.style.color = 'var(--c-muted)';
    
    const formData = new FormData(auditForm);
    try {
      const response = await fetch(auditForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        formStatus.innerText = isCall 
          ? "Thank you! Your strategy call request has been received. I will email you a booking link within 48 hours."
          : "Thank you! Your audit application has been received. I will get back to you within 48 hours.";
        formStatus.style.color = 'var(--c-accent)';
        auditForm.reset();
        
        // Reset form view state back to audit
        const videoLinkGroup = document.getElementById('videoLinkGroup');
        const formLink = document.getElementById('formLink');
        const submitBtn = document.getElementById('submitBtn');
        if (videoLinkGroup && formLink && submitBtn) {
          videoLinkGroup.style.display = 'flex';
          formLink.required = true;
          submitBtn.innerText = "Submit Audit Application";
        }
      } else {
        const data = await response.json();
        formStatus.innerText = data.message || "Oops! There was a problem submitting your application.";
        formStatus.style.color = '#ef4444';
      }
    } catch (error) {
      formStatus.innerText = "Oops! There was a network error. Please try again or email directly.";
      formStatus.style.color = '#ef4444';
    }
  });
}

// 10. Form Inquiry Type Toggle
const typeAudit = document.getElementById('typeAudit');
const typeCall = document.getElementById('typeCall');
const videoLinkGroup = document.getElementById('videoLinkGroup');
const formLink = document.getElementById('formLink');
const submitBtn = document.getElementById('submitBtn');

if (typeAudit && typeCall && videoLinkGroup && formLink && submitBtn) {
  const toggleLinkField = () => {
    if (typeCall.checked) {
      videoLinkGroup.style.display = 'none';
      formLink.required = false;
      submitBtn.innerText = "Request Strategy Call";
    } else {
      videoLinkGroup.style.display = 'flex';
      formLink.required = true;
      submitBtn.innerText = "Submit Audit Application";
    }
  };
  typeAudit.addEventListener('change', toggleLinkField);
  typeCall.addEventListener('change', toggleLinkField);
}

// 11. Accordion Toggling for FAQ (Clean CSS Grid height transitions)
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  if (question && answer) {
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other active FAQ items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAns = otherItem.querySelector('.faq-answer');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });
      
      item.classList.toggle('active');
      if (!isActive) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = null;
      }
    });
  }
});
