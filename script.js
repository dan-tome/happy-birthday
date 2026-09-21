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
  "The way you can brighten up my day and fill me with confidence.",
  "The comfort you give me when I'm down.",
  "The sacrifices you make for us.",
  "Your beautiful face when I wake up.",
  "The way you help and drive me be a better person.",
  "Your delicious baking and contribution to my voluptuous figure.",
  "The way you say my name for the 50th time and I still haven't heard you, but you still don't get mad.",
  "Your incredible singing.",
  "You believe in me even when I don't.",
  "The way you just are. I love you Ninette.",
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

// ---- Mystery Moments ----
// Add a new moment by adding an entry here, with a matching photo in images/.
// "answer" is the index (starting at 0) of the correct entry in "options".
const MOMENTS = [
  {
    img: 'images/valencia-dinner.webp',
    alt: 'Ninette at a lovely restaurant in Valencia',
    caption: "Valencia — I think this was the restaurant where your food never arrived and mine went cold. Did we complain?",
    question: 'Which city were we eating dinner in this photo?',
    options: ['Marbella', 'Barcelona', 'Valencia'],
    answer: 2,
  },
  {
    img: 'images/cliffs-of-moher.webp',
    alt: 'Us at the Cliffs of Moher, Ireland',
    caption: "The tour was worth it introducing the 'Tanking yous'. God bless Brian.",
    question: 'Which are the cliffs in the background called?',
    options: ['Cliffs of waking up at 5am for a coach-ride with loud Germans', 'Cliffs of Moher', 'White Cliffs of Dover'],
    answer: 1,
  },
  {
    img: 'images/galway-girl.webp',
    alt: 'Ninette sitting next to the Galway Girl statue in Galway',
    caption: "You're my Galway girl. Lool gaaaayyyy!",
    question: 'What did we have at the pub just before leaving Galway?',
    options: ['A Cocktail', 'A glass of Coke', 'A half-pint of Cider'],
    answer: 2,
  },
  {
    img: 'images/go-ape.webp',
    alt: 'Us at the Go Ape Treetop Challenge',
    caption: "We still haven't forgiven you Naneh!",
    // TODO: the two wrong options below are placeholders — need two real
    // decoy names to go with "Naneh" (see chat for why).
    question: 'What was the name of the person who subjected us to this horror?',
    options: ['Not Naneh', 'Naneh', 'Definitely not Naneh'],
    answer: 1,
  },
  {
    img: 'images/horse-riding.webp',
    alt: 'Ninette horseback riding on the beach',
    caption: 'When Ajax starting slipping on the cliff, was when you realised what a great decision you made to book the horse riding.',
    question: 'What was your horse called?',
    options: ['Sham', 'Ajax', "I was so scared, I screamed the whole time so I don't remember"],
    answer: 1,
  },
  {
    img: 'images/old-flat-dinner.webp',
    alt: 'Ninette having a candlelit dinner at the old flat',
    caption: 'I miss those nights where we had to pack up the table after eating to be able to watch TV.',
    question: 'What was the door number and postcode of my old studio?',
    options: ['67, N9 7QF', '66, N8 7QF', '66, N8 7QE', '60, N8 7QF'],
    answer: 1,
  },
  {
    img: 'images/winchester.webp',
    alt: 'Us in front of the Christmas tree in Winchester',
    caption: 'Remember the Mediterranean dish we struggled to make.',
    question: 'What was the name of the town / city we visited in this photo?',
    options: ['Marlow', 'Winchester', 'St Albans', 'Oxford'],
    answer: 1,
  },
];

// Moments without a photo yet — shown as plain placeholders, no quiz.
const UPCOMING_MOMENTS = [];

// The bonus round — one attempt only, real stakes. Unlike MOMENTS above,
// there's no retry: the first answer picked is final.
const BONUS_MOMENT = {
  img: 'images/chelsea-game.webp',
  alt: 'Watching the Chelsea game at the pub',
  question: 'For a chance to win a £100 Sephora voucher.\n\nWe took a trip to a random pub in front of Reading station to watch a Chelsea game on the 10th Jan 2026.\n\nWhat was the name of the Chelsea manager at the time of this game?',
  options: ['Enzo Maresca', 'Xabi Alonso', 'Liam Rosenior', 'Frank Lampard'],
  answer: 2,
  correctReveal: "Congratulations, you know Daniel's team enough to deserve an extra £100 Sephora vouchers.",
  wrongReveal: 'Oh no! Oh well, at least you still have the rest of the vouchers Daniel has stupidly promised you.',
};

function isBonusUnlocked() {
  return getSolvedMoments().size >= MOMENTS.length;
}

function getSolvedMoments() {
  try {
    const raw = localStorage.getItem('mysterySolved');
    return new Set(raw ? JSON.parse(raw) : []);
  } catch (e) {
    return new Set();
  }
}

function markMomentSolved(index) {
  try {
    const solved = getSolvedMoments();
    solved.add(index);
    localStorage.setItem('mysterySolved', JSON.stringify([...solved]));
  } catch (e) {
    // ignore — solved state just won't persist across visits
  }
}

function buildMysteryCard(moment, index, solved) {
  const card = document.createElement('figure');
  card.className = 'polaroid mystery-card' + (solved ? ' solved' : '');

  const frame = document.createElement('div');
  frame.className = 'mystery-frame';

  const img = document.createElement('img');
  img.src = moment.img;
  img.alt = moment.alt;
  frame.appendChild(img);

  const overlay = document.createElement('button');
  overlay.type = 'button';
  overlay.className = 'mystery-overlay';
  overlay.setAttribute('aria-label', 'Answer a quick quiz to reveal this memory');
  overlay.innerHTML = '<span class="mystery-mark">?</span><span class="mystery-label">tap to unlock</span>';
  overlay.addEventListener('click', () => openQuiz(index));
  frame.appendChild(overlay);

  card.appendChild(frame);

  const caption = document.createElement('figcaption');
  caption.textContent = solved ? moment.caption : 'a mystery moment';
  card.appendChild(caption);

  return card;
}

function buildPlaceholderCard(text) {
  const card = document.createElement('figure');
  card.className = 'polaroid';
  card.innerHTML = `<div class="placeholder">📷</div><figcaption>${text}</figcaption>`;
  return card;
}

function getBonusResult() {
  try {
    return localStorage.getItem('bonusResult'); // 'correct' | 'wrong' | null
  } catch (e) {
    return null;
  }
}

function setBonusResult(result) {
  try {
    localStorage.setItem('bonusResult', result);
  } catch (e) {
    // ignore — result just won't persist across visits
  }
}

function buildBonusCard(result) {
  const unlocked = isBonusUnlocked();
  const card = document.createElement('figure');
  card.id = 'bonus-card';
  card.className = 'polaroid mystery-card bonus-card' + (result ? ' solved' : '') + (unlocked ? '' : ' locked');

  const frame = document.createElement('div');
  frame.className = 'mystery-frame';

  const img = document.createElement('img');
  img.src = BONUS_MOMENT.img;
  img.alt = BONUS_MOMENT.alt;
  frame.appendChild(img);

  const overlay = document.createElement('button');
  overlay.type = 'button';
  overlay.className = 'mystery-overlay';
  if (unlocked) {
    overlay.setAttribute('aria-label', 'Play the one-shot bonus round');
    overlay.innerHTML = '<span class="mystery-mark">★</span><span class="mystery-label">bonus round</span>';
  } else {
    overlay.setAttribute('aria-label', 'Bonus round locked until all Mystery Moments are solved');
    overlay.innerHTML = '<span class="mystery-mark">🔒</span><span class="mystery-label">solve all 7 first</span>';
  }
  overlay.addEventListener('click', openBonusQuiz);
  frame.appendChild(overlay);

  card.appendChild(frame);

  const caption = document.createElement('figcaption');
  if (result === 'correct') {
    caption.textContent = BONUS_MOMENT.correctReveal;
  } else if (result === 'wrong') {
    caption.textContent = BONUS_MOMENT.wrongReveal;
  } else if (unlocked) {
    caption.textContent = 'one shot only — choose wisely';
  } else {
    const remaining = MOMENTS.length - getSolvedMoments().size;
    caption.textContent = `locked — ${remaining} more moment${remaining === 1 ? '' : 's'} to unlock`;
  }
  card.appendChild(caption);

  return card;
}

function initGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const solved = getSolvedMoments();

  MOMENTS.forEach((moment, index) => {
    grid.appendChild(buildMysteryCard(moment, index, solved.has(index)));
  });
  UPCOMING_MOMENTS.forEach((text) => {
    grid.appendChild(buildPlaceholderCard(text));
  });
  grid.appendChild(buildBonusCard(getBonusResult()));
}

const modalOverlay = document.getElementById('modal-overlay');
const modalBody = document.getElementById('modal-body');
const modalCloseBtn = document.getElementById('modal-close');

function openQuiz(index) {
  renderQuizQuestion(MOMENTS[index], index);
  modalOverlay.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.hidden = true;
  document.body.style.overflow = '';
}

function renderQuizQuestion(moment, index) {
  modalBody.innerHTML = '';

  const img = document.createElement('img');
  img.src = moment.img;
  img.alt = moment.alt;
  img.className = 'modal-photo';
  modalBody.appendChild(img);

  const question = document.createElement('p');
  question.className = 'modal-question';
  question.id = 'modal-question';
  question.textContent = moment.question;
  modalBody.appendChild(question);

  const optionsWrap = document.createElement('div');
  optionsWrap.className = 'modal-options';

  moment.options.forEach((optionText, optionIndex) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'modal-option';
    btn.textContent = optionText;
    btn.addEventListener('click', () => handleQuizAnswer(moment, index, optionIndex, btn, optionsWrap));
    optionsWrap.appendChild(btn);
  });
  modalBody.appendChild(optionsWrap);

  const feedback = document.createElement('p');
  feedback.className = 'modal-feedback';
  feedback.id = 'modal-feedback';
  modalBody.appendChild(feedback);
}

function handleQuizAnswer(moment, index, chosenIndex, btn, optionsWrap) {
  const feedback = document.getElementById('modal-feedback');

  if (chosenIndex === moment.answer) {
    markMomentSolved(index);
    Array.from(optionsWrap.children).forEach((b) => { b.disabled = true; });
    btn.classList.add('correct');
    feedback.textContent = 'Got it 💗';
    feedback.classList.add('correct');
    setTimeout(() => renderQuizReveal(moment, index), 600);
  } else {
    btn.classList.remove('incorrect');
    void btn.offsetWidth; // restart the shake animation
    btn.classList.add('incorrect');
    feedback.textContent = 'Not quite — try again';
    feedback.classList.remove('correct');
  }
}

function renderQuizReveal(moment, index) {
  modalBody.innerHTML = '';

  const img = document.createElement('img');
  img.src = moment.img;
  img.alt = moment.alt;
  img.className = 'modal-photo';
  modalBody.appendChild(img);

  const caption = document.createElement('p');
  caption.className = 'modal-caption';
  caption.textContent = moment.caption;
  modalBody.appendChild(caption);

  const continueBtn = document.createElement('button');
  continueBtn.type = 'button';
  continueBtn.className = 'reason-btn modal-continue';
  continueBtn.textContent = 'Continue';
  continueBtn.addEventListener('click', () => {
    closeModal();
    revealCardInGrid(index);
  });
  modalBody.appendChild(continueBtn);
}

function revealCardInGrid(index) {
  const grid = document.getElementById('gallery-grid');
  const card = grid.children[index];
  if (!card) return;
  card.classList.add('solved');
  const caption = card.querySelector('figcaption');
  if (caption) caption.textContent = MOMENTS[index].caption;
  refreshBonusCardLock();
}

// Swaps the bonus card's locked/unlocked look in place, without touching
// its result state — called whenever a regular moment gets solved.
function refreshBonusCardLock() {
  const oldCard = document.getElementById('bonus-card');
  if (!oldCard || getBonusResult()) return; // already played, nothing to refresh
  const newCard = buildBonusCard(null);
  oldCard.replaceWith(newCard);
}

function openBonusQuiz() {
  const result = getBonusResult();
  if (result) {
    renderBonusResult(result);
  } else if (!isBonusUnlocked()) {
    renderBonusLocked();
  } else {
    renderBonusQuestion();
  }
  modalOverlay.hidden = false;
  document.body.style.overflow = 'hidden';
}

function renderBonusLocked() {
  modalBody.innerHTML = '';

  const lock = document.createElement('p');
  lock.className = 'modal-question';
  lock.textContent = '🔒 Locked';
  modalBody.appendChild(lock);

  const remaining = MOMENTS.length - getSolvedMoments().size;
  const hint = document.createElement('p');
  hint.className = 'modal-feedback';
  hint.textContent = `Solve all 7 Mystery Moments to unlock the bonus round — ${remaining} to go.`;
  modalBody.appendChild(hint);

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'reason-btn modal-continue';
  closeBtn.textContent = 'Close';
  closeBtn.addEventListener('click', closeModal);
  modalBody.appendChild(closeBtn);
}

function renderBonusQuestion() {
  modalBody.innerHTML = '';

  const img = document.createElement('img');
  img.src = BONUS_MOMENT.img;
  img.alt = BONUS_MOMENT.alt;
  img.className = 'modal-photo';
  modalBody.appendChild(img);

  const badge = document.createElement('p');
  badge.className = 'modal-bonus-badge';
  badge.textContent = 'BONUS ROUND — one attempt only, no take-backs';
  modalBody.appendChild(badge);

  const question = document.createElement('p');
  question.className = 'modal-question';
  question.textContent = BONUS_MOMENT.question;
  modalBody.appendChild(question);

  const optionsWrap = document.createElement('div');
  optionsWrap.className = 'modal-options';

  BONUS_MOMENT.options.forEach((optionText, optionIndex) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'modal-option';
    btn.textContent = optionText;
    btn.addEventListener('click', () => handleBonusAnswer(optionIndex, btn, optionsWrap));
    optionsWrap.appendChild(btn);
  });
  modalBody.appendChild(optionsWrap);
}

function handleBonusAnswer(chosenIndex, btn, optionsWrap) {
  const correct = chosenIndex === BONUS_MOMENT.answer;
  const result = correct ? 'correct' : 'wrong';
  setBonusResult(result);

  Array.from(optionsWrap.children).forEach((b) => { b.disabled = true; });
  btn.classList.add(correct ? 'correct' : 'incorrect');

  setTimeout(() => {
    renderBonusResult(result);
    updateBonusCardInGrid(result);
  }, 700);
}

function renderBonusResult(result) {
  modalBody.innerHTML = '';

  const img = document.createElement('img');
  img.src = BONUS_MOMENT.img;
  img.alt = BONUS_MOMENT.alt;
  img.className = 'modal-photo';
  modalBody.appendChild(img);

  const caption = document.createElement('p');
  caption.className = 'modal-caption';
  caption.textContent = result === 'correct' ? BONUS_MOMENT.correctReveal : BONUS_MOMENT.wrongReveal;
  modalBody.appendChild(caption);

  const continueBtn = document.createElement('button');
  continueBtn.type = 'button';
  continueBtn.className = 'reason-btn modal-continue';
  continueBtn.textContent = 'Close';
  continueBtn.addEventListener('click', closeModal);
  modalBody.appendChild(continueBtn);
}

function updateBonusCardInGrid(result) {
  const card = document.getElementById('bonus-card');
  if (!card) return;
  card.classList.add('solved');
  const caption = card.querySelector('figcaption');
  if (caption) caption.textContent = result === 'correct' ? BONUS_MOMENT.correctReveal : BONUS_MOMENT.wrongReveal;
}

modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modalOverlay.hidden) closeModal();
});

// DEV ONLY — remove this button (and this listener) once we're done testing.
const devResetBtn = document.getElementById('dev-reset-btn');
if (devResetBtn) {
  devResetBtn.addEventListener('click', () => {
    try {
      localStorage.removeItem('mysterySolved');
      localStorage.removeItem('bonusResult');
    } catch (e) {
      // ignore
    }
    closeModal();
    initGallery();
  });
}

initGallery();

// ---- Tab navigation ----
function switchTab(tabName) {
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  document.querySelectorAll('.tab-panel').forEach((panel) => {
    panel.classList.toggle('active', panel.id === tabName);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});
