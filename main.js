const HP = 100;
let username = '';
let cpuCard = null;
let playerCard = null;

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSOR = 'SCISSOR';

const EVENTS = {
  RENDER: 'RENDER',
};

document.addEventListener('DOMContentLoaded', () => {});

document.addEventListener(EVENTS.RENDER, () => {});

function cpuAttack() {
  const attackTools = [ROCK, PAPER, SCISSOR];
  const index = Math.floor(Math.random() * attackTools.length);
  return attackTools[index];
}
