const HP = 100;
let username = '';
let cpuCard = null;
let playerCard = null;
let cpuHP = HP;
let playerHP = HP;
let loading = false;

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSOR = 'SCISSOR';
const TIE = 'TIE';

const ATTACK_TOOLS = [
  { name: PAPER, icon: '📄' },
  { name: ROCK, icon: '🧱' },
  { name: SCISSOR, icon: '✂' },
];

const EVENTS = {
  SET_USERNAME: 'SET_USERNAME',
  BATTLE: 'BATTLE',
  RENDER_HP: 'RENDER_HP',
  RESET_BATTLE: 'RESET_BATTLE',
  WIN: 'WIN',
  LOADING: 'LOADING',
  FLIP_CARD: 'FLIP_CARD',
};

document.addEventListener('DOMContentLoaded', () => {
  const startBtnEl = document.getElementById('start-btn');
  if (startBtnEl) {
    startBtnEl.addEventListener('click', startBattle);
  }
});

document.addEventListener(EVENTS.SET_USERNAME, () => {});

document.addEventListener(EVENTS.RESET_BATTLE, () => {});

document.addEventListener(EVENTS.FLIP_CARD, () => {
  cpuCard = cpuAttack();

  const cpuCardIconEl = document.getElementById('cpu-card-icon');
  cpuCardIconEl.innerHTML = cpuCard.icon;

  const innerCardEls = document.querySelectorAll(
    '.battle-card .battle-card__inner'
  );

  if (innerCardEls.length > 0) {
    countdown(3, () =>
      innerCardEls.forEach((el) => {
        el.classList.add('rotate');
      })
    );
  }
});

document.addEventListener(EVENTS.RENDER_HP, () => {});

function cpuAttack() {
  const index = Math.floor(Math.random() * ATTACK_TOOLS.length);
  return ATTACK_TOOLS[index];
}

function matchCard(value1, value2) {
  if (
    (value1 === ROCK && value2 === PAPER) ||
    (value2 === ROCK && value1 === PAPER)
  ) {
    return PAPER;
  } else if (
    (value1 === ROCK && value2 === SCISSOR) ||
    (value2 === ROCK && value1 === SCISSOR)
  ) {
    return ROCK;
  } else if (
    (value1 === SCISSOR && value2 === PAPER) ||
    (value2 === SCISSOR && value1 === PAPER)
  ) {
    return SCISSOR;
  } else {
    return TIE;
  }
}

function compareCard(matchResult) {
  if (playerCard === matchResult && cpuCard === playerCard) {
    return;
  } else if (playerCard === matchResult && cpuCard !== playerCard) {
    cpuCard -= 50;
  } else {
    playerCard -= 50;
  }
}

function countdown(length = 5, cb) {
  const loadingEl = document.getElementById('loading');
  const overlay = document.getElementById('overlay');

  loadingEl.innerHTML = 'READY...';
  loading = true;

  if (loading) {
    overlay.classList.add('show');
  }

  let count = length;
  const timerId = setInterval(() => {
    loadingEl.innerHTML = count;
    count -= 1;
    if (count < 0) {
      cb();
      overlay.classList.remove('show');
      loading = false;
      clearInterval(timerId);
    }
  }, 1000);
}

function startBattle() {
  document.dispatchEvent(new Event(EVENTS.FLIP_CARD));
}
