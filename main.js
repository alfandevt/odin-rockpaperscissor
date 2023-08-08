const HP = 100;
let username = '';
let cpuCard = null;
let playerCard = null;
let cpuHP = HP;
let playerHP = HP;

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSOR = 'SCISSOR';
const TIE = 'TIE';

const EVENTS = {
  SET_USERNAME: 'SET_USERNAME',
  BATTLE: 'BATTLE',
  RENDER_HP: 'RENDER_HP',
};

document.addEventListener('DOMContentLoaded', () => {});

document.addEventListener(EVENTS.SET_USERNAME, () => {

})

document.addEventListener(EVENTS.BATTLE, () => {});

document.addEventListener(EVENTS.RENDER_HP, () => {});

function cpuAttack() {
  const attackTools = [ROCK, PAPER, SCISSOR];
  const index = Math.floor(Math.random() * attackTools.length);
  return attackTools[index];
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

function startBattle() {
  document.dispatchEvent(new Event(EVENTS.BATTLE));
}
