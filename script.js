// ---- Configuration ----
// Her birthday: month/day (year is ignored, we always count to the next occurrence)
const BIRTHDAY_MONTH = 9;  // September
const BIRTHDAY_DAY = 22;

// ---- Countdown ----
function nextBirthday() {
  const now = new Date();
  let year = now.getFullYear();
  let target = new Date(year, BIRTHDAY_MONTH - 1, BIRTHDAY_DAY, 0, 0, 0);
  if (target < now) {
    target = new Date(year + 1, BIRTHDAY_MONTH - 1, BIRTHDAY_DAY, 0, 0, 0);
  }
  return target;
}

function isToday() {
  const now = new Date();
  return now.getMonth() === BIRTHDAY_MONTH - 1 && now.getDate() === BIRTHDAY_DAY;
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function updateCountdown() {
  const caption = document.getElementById('countdown-caption');
  const countdownEl = document.getElementById('countdown');

  if (isToday()) {
    countdownEl.style.display = 'none';
    caption.textContent = "It's your day! Happy Birthday, Ninette! 🎉";
    return;
  }

  const target = nextBirthday();
  const now = new Date();
  const diff = target - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('days').textContent = pad(days);
  document.getElementById('hours').textContent = pad(hours);
  document.getElementById('minutes').textContent = pad(minutes);
  document.getElementById('seconds').textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ---- Floating hearts ----
function spawnHeart() {
  const container = document.getElementById('hearts');
  const heart = document.createElement('span');
  heart.className = 'heart';
  heart.textContent = ['💗', '💖', '💕', '♥'][Math.floor(Math.random() * 4)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = 1 + Math.random() * 1.5 + 'rem';
  const duration = 8 + Math.random() * 8;
  heart.style.animationDuration = duration + 's';
  container.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}
setInterval(spawnHeart, 900);
for (let i = 0; i < 6; i++) setTimeout(spawnHeart, i * 300);

// ---- Reasons I love you ----
// Edit this list with your own reasons!
const REASONS = [
  "The way you laugh at your own jokes before you finish telling them.",
  "You make ordinary days feel like something worth remembering.",
  "You remember the little things I mention once, weeks later.",
  "Your hugs fix almost everything.",
  "You're the most stubbornly kind person I know.",
  "You make me want to be better without ever asking me to be.",
  "The way you say my name.",
  "You dance in the kitchen when you think no one's watching.",
  "You believe in me even when I don't.",
  "Every single ordinary Tuesday with you is my favorite kind of day.",
];

let remaining = [...REASONS];

function showReason() {
  if (remaining.length === 0) remaining = [...REASONS];
  const index = Math.floor(Math.random() * remaining.length);
  const reason = remaining.splice(index, 1)[0];

  const textEl = document.getElementById('reason-text');
  textEl.style.animation = 'none';
  // force reflow to restart animation
  void textEl.offsetWidth;
  textEl.style.animation = '';
  textEl.textContent = reason;

  const shown = REASONS.length - remaining.length;
  const countEl = document.getElementById('reason-count');
  countEl.textContent = `reason ${shown === 0 ? REASONS.length : shown} of ${REASONS.length} this round`;
}

document.getElementById('reason-btn').addEventListener('click', showReason);
