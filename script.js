/**
 * ✨ MAGICAL DIWALI EXTRAVAGANZA ✨
 * Pure Vanilla JavaScript: Audio Synthesis, Fireworks Particle Physics,
 * Dynamic Diya Lighting, Typing Engine & Scene Transitions.
 */

/* ==========================================================================
   1. EDITABLE FESTIVE CONFIGURATION & WISHES
   ========================================================================== */
const DIWALI_CONFIG = {
  // Section 4 Special Letter Message (Can be freely customized)
  specialLetter: 
`On this beautiful occasion of Diwali, I wish you endless happiness, countless reasons to smile, success in everything you do, and a life filled with positivity and beautiful moments.

May every diya bring new hope, every sparkle bring happiness, and every celebration create unforgettable memories.

Wishing You A Very Happy Diwali! 🪔✨`,

  // Section 3 Interactive Diyas Data
  diyas: [
    { id: 1, title: "Aarogya (Health)", wish: "May pristine health and vibrant vitality always bless you & your family! 🌿" },
    { id: 2, title: "Samriddhi (Wealth)", wish: "May Goddess Lakshmi shower limitless abundance, fortune and success! 💰" },
    { id: 3, title: "Shanti (Peace)", wish: "May calm tranquility, harmony and soul peace fill every day of your year. 🕊️" },
    { id: 4, title: "Safalta (Success)", wish: "May all your ventures, goals and sacred dreams soar to monumental victories! 🏆" },
    { id: 5, title: "Prem (Love)", wish: "May affection, empathy, friendship and genuine bonds forever surround you. ❤️" },
    { id: 6, title: "Aanand (Joy)", wish: "May infectious laughter and celebratory cheer illuminate your heartwarming home! ✨" }
  ],

  // Section 5 Floating Sky Wishes
  skyWishes: [
    "✨ Prosperity & Eternal Abundance ✨",
    "🪔 Wisdom & Enlightenment 🪔",
    "💖 Warmth, Laughter & Joy 💖",
    "🌟 Victorious Triumphs in All Paths 🌟",
    "🎆 Safe, Splendid & Radiant Diwali! 🎆"
  ]
};

/* ==========================================================================
   2. PROCEDURAL SOUND SYNTHESIS (NO EXTERNAL MP3 DEPENDENCIES)
   Uses Web Audio API to create authentic sitar chimes, cracker snaps & bells.
   ========================================================================== */
class FestiveAudioEngine {
  constructor() {
    this.ctx = null;
    this.muted = true;
    this.isBgmPlaying = false;
    this.bgmTimer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound(buttonEl) {
    this.init();
    this.muted = !this.muted;

    if (this.muted) {
      buttonEl.innerHTML = '<span class="icon">🔇</span>';
      this.stopBGM();
    } else {
      buttonEl.innerHTML = '<span class="icon">🔊</span>';
      this.startBGM();
      this.playDiyaChime();
    }
  }

  // Pure Indian pentatonic chime generator
  playNote(frequency, duration, type = 'sine', gainVal = 0.15) {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Context note error:", e);
    }
  }

  playDiyaChime() {
    // Elegant temple bell harmonized frequency series
    this.playNote(587.33, 1.2, 'sine', 0.2); // D5
    setTimeout(() => this.playNote(880, 1.4, 'sine', 0.15), 100); // A5
    setTimeout(() => this.playNote(1174.66, 1.6, 'triangle', 0.1), 220); // D6
  }

  playFireworkPop() {
    if (this.muted || !this.ctx) return;
    try {
      // Crackle white-noise burst
      const bufferSize = this.ctx.sampleRate * 0.25;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.25);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
    } catch (e) {
      console.warn(e);
    }
  }

  startBGM() {
    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;
    
    // Raag Bhupali Pentatonic Melody progression (Sa Re Ga Pa Dha)
    const scale = [293.66, 329.63, 369.99, 440.00, 493.88, 587.33, 739.99];
    let noteIndex = 0;

    const loopMelody = () => {
      if (!this.isBgmPlaying || this.muted) return;
      const freq = scale[Math.floor(Math.random() * scale.length)];
      this.playNote(freq, 2.2, 'triangle', 0.05);

      const delay = [400, 600, 800, 1200][Math.floor(Math.random() * 4)];
      this.bgmTimer = setTimeout(loopMelody, delay);
    };

    loopMelody();
  }

  stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) clearTimeout(this.bgmTimer);
  }
}

const audio = new FestiveAudioEngine();

/* ==========================================================================
   3. FIREWORKS CANVAS SIMULATION ENGINE
   Full 60FPS particle physics, multi-layer explosions & gravity.
   ========================================================================== */
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

let cw = window.innerWidth;
let ch = window.innerHeight;
let fireworks = [];
let particles = [];
let sparkles = [];

function resizeCanvas() {
  cw = canvas.width = window.innerWidth;
  ch = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class FireworkRocket {
  constructor(sx, sy, tx, ty, color) {
    this.x = sx;
    this.y = sy;
    this.sx = sx;
    this.sy = sy;
    this.tx = tx;
    this.ty = ty;
    this.distanceToTarget = Math.hypot(tx - sx, ty - sy);
    this.distanceTraveled = 0;
    this.coordinates = [];
    this.coordinateCount = 3;
    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }
    this.angle = Math.atan2(ty - sy, tx - sx);
    this.speed = 3;
    this.acceleration = 1.05;
    this.brightness = Math.random() * 20 + 70;
    this.color = color || `hsl(${Math.random() * 60 + 20}, 100%, 65%)`; // Golds & Warm festive
  }

  update(index) {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);

    this.speed *= this.acceleration;
    const vx = Math.cos(this.angle) * this.speed;
    const vy = Math.sin(this.angle) * this.speed;
    this.distanceTraveled = Math.hypot(this.x + vx - this.sx, this.y + vy - this.sy);

    if (this.distanceTraveled >= this.distanceToTarget) {
      createFireworkExplosion(this.tx, this.ty, this.color);
      audio.playFireworkPop();
      fireworks.splice(index, 1);
    } else {
      this.x += vx;
      this.y += vy;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2.5;
    ctx.stroke();
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.coordinates = [];
    this.coordinateCount = 5;
    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 8 + 1.5;
    this.friction = 0.95;
    this.gravity = 0.9;
    this.color = color;
    this.alpha = 1;
    this.decay = Math.random() * 0.018 + 0.012;
  }

  update(index) {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);

    this.speed *= this.friction;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;
    this.alpha -= this.decay;

    if (this.alpha <= this.decay) {
      particles.splice(index, 1);
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = this.color;
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.lineWidth = 1.8;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

function createFireworkExplosion(x, y, baseColor) {
  const particleCount = 75;
  const hues = [baseColor, '#ffd700', '#ff4500', '#ff0077', '#00e5ff', '#ffffff'];
  for (let i = 0; i < particleCount; i++) {
    const col = hues[Math.floor(Math.random() * hues.length)];
    particles.push(new Particle(x, y, col));
  }
}

function launchFirework(tx, ty) {
  const sx = cw / 2 + (Math.random() * 300 - 150);
  const sy = ch;
  const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 65%)`;
  fireworks.push(new FireworkRocket(sx, sy, tx, ty, color));
}

function fireworksAnimationLoop() {
  requestAnimationFrame(fireworksAnimationLoop);

  // Clear with transparent alpha for majestic tracer trails
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, cw, ch);
  ctx.globalCompositeOperation = 'lighter';

  let i = fireworks.length;
  while (i--) {
    fireworks[i].draw();
    fireworks[i].update(i);
  }

  let j = particles.length;
  while (j--) {
    particles[j].draw();
    particles[j].update(j);
  }
}
fireworksAnimationLoop();

// Interactive sky launcher (Click anywhere in canvas or fireworks view)
canvas.addEventListener('pointerdown', (e) => {
  launchFirework(e.clientX, e.clientY);
});

/* ==========================================================================
   4. AMBIENT PARTICLES (STARS & DUST)
   ========================================================================== */
function initAmbientStars() {
  const container = document.getElementById('ambientStars');
  const count = 45;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star-speck';
    const size = Math.random() * 4 + 2;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 6 + 6}s`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(star);
  }
}
initAmbientStars();

/* ==========================================================================
   5. SCENE CONTROLLER & TRANSITIONS
   ========================================================================== */
const scenes = {
  intro: document.getElementById('scene-intro'),
  celebration: document.getElementById('scene-celebration'),
  diyas: document.getElementById('scene-diyas'),
  letter: document.getElementById('scene-letter'),
  fireworks: document.getElementById('scene-fireworks'),
  surprise: document.getElementById('scene-surprise')
};

function switchScene(fromSceneKey, toSceneKey) {
  audio.init();
  const current = scenes[fromSceneKey];
  const next = scenes[toSceneKey];

  if (current) {
    current.classList.add('hidden');
    setTimeout(() => {
      current.classList.remove('active');
    }, 700);
  }

  if (next) {
    setTimeout(() => {
      next.classList.remove('hidden');
      next.classList.add('active');
    }, 200);
  }
}

/* ==========================================================================
   6. SCENE 1 -> 2: GRAND UNVEILING SURPRISE
   ========================================================================== */
document.getElementById('btnOpenSurprise').addEventListener('click', () => {
  audio.playDiyaChime();
  
  // Launch celebration salvo of 6 celebratory rockets across viewport
  for (let i = 0; i < 7; i++) {
    setTimeout(() => {
      launchFirework(
        (cw * 0.15) + Math.random() * (cw * 0.7),
        (ch * 0.15) + Math.random() * (ch * 0.4)
      );
    }, i * 180);
  }

  switchScene('intro', 'celebration');
});

document.getElementById('toDiyasBtn').addEventListener('click', () => {
  audio.playDiyaChime();
  switchScene('celebration', 'diyas');
});

/* ==========================================================================
   7. SCENE 3: INTERACTIVE DIYAS EXPERIENCE
   ========================================================================== */
const diyasGrid = document.getElementById('diyasGrid');
const diyaWishBox = document.getElementById('diyaWishBox');

function buildInteractiveDiyas() {
  diyasGrid.innerHTML = '';
  DIWALI_CONFIG.diyas.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'diya-card';
    card.id = `diya-card-${item.id}`;

    card.innerHTML = `
      <div class="diya" id="diya-${item.id}">
        <div class="flame-glow"></div>
        <div class="diya-flame"></div>
        <div class="diya-clay"></div>
      </div>
      <div class="diya-name">${item.title}</div>
    `;

    card.addEventListener('click', () => {
      igniteDiya(item, card);
    });

    diyasGrid.appendChild(card);
  });
}
buildInteractiveDiyas();

function igniteDiya(item, cardEl) {
  const diyaEl = cardEl.querySelector('.diya');
  const wasAlreadyLit = diyaEl.classList.contains('is-lit');

  diyaEl.classList.add('is-lit');
  cardEl.classList.add('card-lit');
  audio.playDiyaChime();

  // Burst mini spark particles from clicked diya
  const rect = diyaEl.getBoundingClientRect();
  createFireworkExplosion(rect.left + rect.width / 2, rect.top, '#ffd700');

  // Display festive wish with animated feedback
  diyaWishBox.innerHTML = `<p class="wish-active">${item.wish}</p>`;

  // Gentle congratulatory burst if all 6 diyas are lit
  const litCount = document.querySelectorAll('.diya.is-lit').length;
  if (litCount >= 6 && !wasAlreadyLit) {
    setTimeout(() => {
      launchFirework(cw / 2, ch * 0.25);
    }, 400);
  }
}

document.getElementById('toLetterBtn').addEventListener('click', () => {
  audio.playDiyaChime();
  switchScene('diyas', 'letter');
});

/* ==========================================================================
   8. SCENE 4: SPECIAL MESSAGE CARD (ENVELOPE & TYPEWRITER)
   ========================================================================== */
let isLetterOpened = false;
let typewriterInterval = null;

document.getElementById('btnOpenLetter').addEventListener('click', () => {
  if (isLetterOpened) return;
  isLetterOpened = true;

  const envelope = document.getElementById('envelope');
  const openBtn = document.getElementById('btnOpenLetter');
  const toFireworksBtn = document.getElementById('toFireworksBtn');
  const target = document.getElementById('typewriterTarget');

  audio.playDiyaChime();
  envelope.classList.add('is-open');
  openBtn.classList.add('hidden');

  // Start smooth typewriter effect after envelope slide completes
  setTimeout(() => {
    typeMessage(DIWALI_CONFIG.specialLetter, target, () => {
      toFireworksBtn.classList.remove('hidden');
    });
  }, 900);
});

function typeMessage(text, container, onComplete) {
  container.textContent = '';
  let index = 0;
  if (typewriterInterval) clearInterval(typewriterInterval);

  typewriterInterval = setInterval(() => {
    if (index < text.length) {
      container.textContent += text.charAt(index);
      index++;
      // Soft audio tick on every 4th character for organic tactile feel
      if (index % 4 === 0) audio.playNote(987.77, 0.06, 'sine', 0.015);
    } else {
      clearInterval(typewriterInterval);
      if (onComplete) onComplete();
    }
  }, 24);
}

document.getElementById('toFireworksBtn').addEventListener('click', () => {
  audio.playDiyaChime();
  switchScene('letter', 'fireworks');
  startWishCarousel();
});

/* ==========================================================================
   9. SCENE 5: FIREWORKS CAROUSEL & AUTO-LAUNCH
   ========================================================================== */
let carouselTimer = null;
let autoSalvoTimer = null;

function startWishCarousel() {
  const banner = document.getElementById('fireworkWishBanner');
  let currentIdx = 0;

  if (carouselTimer) clearInterval(carouselTimer);
  carouselTimer = setInterval(() => {
    currentIdx = (currentIdx + 1) % DIWALI_CONFIG.skyWishes.length;
    banner.innerHTML = `<div class="wish-pill active">${DIWALI_CONFIG.skyWishes[currentIdx]}</div>`;
  }, 3200);

  // Automatic festive greeting launch
  triggerGrandCrackers();
}

function triggerGrandCrackers() {
  for (let i = 0; i < 9; i++) {
    setTimeout(() => {
      const tx = (cw * 0.1) + Math.random() * (cw * 0.8);
      const ty = (ch * 0.1) + Math.random() * (ch * 0.45);
      launchFirework(tx, ty);
    }, i * 260);
  }
}

document.getElementById('launchBurstBtn').addEventListener('click', () => {
  triggerGrandCrackers();
});

document.getElementById('toSurpriseBtn').addEventListener('click', () => {
  audio.playDiyaChime();
  if (carouselTimer) clearInterval(carouselTimer);
  switchScene('fireworks', 'surprise');
});

/* ==========================================================================
   10. SCENE 6: FINAL 3D GIFT SURPRISE & REPLAY
   ========================================================================== */
const giftBox = document.getElementById('giftBox');
const finalCard = document.getElementById('finalCard');

giftBox.addEventListener('click', () => {
  const boxInner = giftBox.querySelector('.gift-box');
  if (boxInner.classList.contains('opened')) return;

  boxInner.classList.add('opened');
  audio.playDiyaChime();

  // Grand golden blast of particles
  const rect = giftBox.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  createFireworkExplosion(centerX, centerY, '#ffd700');
  createFireworkExplosion(centerX, centerY - 40, '#ff3366');

  // Multi-firework sky salvo
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      launchFirework(
        (cw * 0.2) + Math.random() * (cw * 0.6),
        (ch * 0.15) + Math.random() * (ch * 0.35)
      );
    }, i * 220);
  }

  // Reveal final card smoothly
  setTimeout(() => {
    finalCard.classList.add('show');
  }, 650);
});

// Restart Celebration Handler
function restartCelebration() {
  // Reset all state variables
  isLetterOpened = false;
  if (typewriterInterval) clearInterval(typewriterInterval);
  if (carouselTimer) clearInterval(carouselTimer);

  // Reset Envelope & Letter
  const envelope = document.getElementById('envelope');
  const openLetterBtn = document.getElementById('btnOpenLetter');
  const toFireworksBtn = document.getElementById('toFireworksBtn');
  const target = document.getElementById('typewriterTarget');
  
  envelope.classList.remove('is-open');
  openLetterBtn.classList.remove('hidden');
  toFireworksBtn.classList.add('hidden');
  target.textContent = '';

  // Reset Gift Box
  const boxInner = giftBox.querySelector('.gift-box');
  boxInner.classList.remove('opened');
  finalCard.classList.remove('show');

  // Reset Diyas (except center Diya which remains illuminated)
  document.querySelectorAll('.diya-card').forEach(card => card.classList.remove('card-lit'));
  document.querySelectorAll('.diyas-grid .diya').forEach(d => d.classList.remove('is-lit'));
  diyaWishBox.innerHTML = '<span class="wish-prompt">Click any diya to ignite light and joy</span>';

  // Navigate back to Scene 1
  Object.keys(scenes).forEach(k => {
    scenes[k].classList.add('hidden');
    scenes[k].classList.remove('active');
  });

  scenes.intro.classList.remove('hidden');
  scenes.intro.classList.add('active');
  audio.playDiyaChime();
}

document.getElementById('restartBtn').addEventListener('click', restartCelebration);
document.getElementById('replayAllBtn').addEventListener('click', restartCelebration);

// Sound Button Toggle
const soundBtn = document.getElementById('soundToggle');
soundBtn.addEventListener('click', () => {
  audio.toggleSound(soundBtn);
});