const HP = 100;
const countdown = 3;

const gameTitle = 'ROCK PAPER SCISSOR';
const gameSubtitle = 'Press the PLAY button to start playing!!';

let computerHP = HP;
let playerHP = HP;

let playerTextLabel = 'Player';
let computerTextLabel = 'Computer';

let computerSelection = null;
let playerSelection = null;

let hasGameFinished = false;
let hasInit = false;
let hasFlipCard = false;

const CARD_LIST = [
  { id: 1, name: 'PAPER', icon: '📄' },
  { id: 2, name: 'ROCK', icon: '🧱' },
  { id: 3, name: 'SCISSOR', icon: '✂' },
];

const EVENTS = {
  RENDER: 'RENDER',
  PLAY: 'PLAY',
  RESET: 'RESET',
};

/* GLOBAL ELEMENTS */
// Body Element
const bodyEl = document.querySelector('body');
// Card Icon
const compareCardIconEl = document.getElementById('computer-card-icon');
const playerCardEl = document.getElementById('player-card-icon');
// Button
const startBtnEl = document.createElement('button');
const deckStartBtnEl = document.createElement('button');
// Overlay
const overlayEl = document.createElement('div');
overlayEl.classList.add('overlay');
// Containers
const deckListEl = document.querySelector('.deck__options__list');
// Labels
const computerLabel = document.getElementById('computer-label');
const playerLabel = document.getElementById('player-label');
const computerCardLabel = document.getElementById('computer-card-label');
const playerCardLabel = document.getElementById('player-card-label');
// Modals
const modalCardEl = document.createElement('div');
const modalCardHeadEl = document.createElement('div');
const modalCardHeadingEl = document.createElement('h1');
const modalCardContentEl = document.createElement('div');
const modalCardContentTextEl = document.createElement('h2');
const modalCardFooterEl = document.createElement('div');

/* Events */
document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
document.addEventListener(EVENTS.RENDER, onRender);
document.addEventListener(EVENTS.PLAY, playGame);
document.addEventListener(EVENTS.RESET, playGame);

/* Function for DOMContentLoaded Event */
function onDOMContentLoaded() {
  toggleModal(gameTitle, gameSubtitle);
  document.dispatchEvent(new Event(EVENTS.RENDER));
}

/* Function to render UI */
function onRender() {
  if (hasInit == false && hasGameFinished == false) {
    initRender();
  }
  renderHPs();
}

/* Function to start the game */
function playGame() {
  computerSelection = getComputerChoice();
  playRound(playerSelection, computerSelection);
}

/* Function to run the game main logic */
function playRound(playerSelection, computerSelection) {
  let playerCard = getCardList().find((v) => v.name == playerSelection);
  let computerCard = getCardList().find((v) => v.name == computerSelection);
  compareCardIconEl.innerHTML = computerCard.icon;

  console.log(playerCard.icon, computerCard.icon);
  if (playerCard.id === computerCard.id) {
    console.log("it's draw");
  } else if (
    (playerCard.id === 1 && computerCard.id == 2) ||
    (playerCard.id === 2 && computerCard.id == 3) ||
    (playerCard.id === 3 && computerCard.id == 1)
  ) {
    computerHP -= 20;
  } else {
    playerHP -= 20;
  }

  flipCard();
  toggleDeckButtons();
  deckStartBtnEl.disabled = true;

  document.dispatchEvent(new Event(EVENTS.RENDER));

  setTimeout(() => {
    flipCard();
    toggleDeckButtons();
    checkRound();
    if (hasInit == true && hasGameFinished == true) {
      endGame();
    }
  }, 1 * 1000);
}

function resetGame() {
  playerHP = HP;
  computerHP = HP;

  computerSelection = null;
  playerSelection = null;

  hasGameFinished = false;
}

/* Function to check the Game Rounds */
function checkRound() {
  if (playerHP <= 0 || computerHP <= 0) {
    hasGameFinished = true;
  } else {
    hasGameFinished = false;
  }
}

function endGame() {
  let subtitle = '';
  if (hasGameFinished == true && computerHP <= 0) {
    subtitle = 'YOU HAVE WON THE GAME!!';
  } else if (hasGameFinished == true && playerHP <= 0) {
    subtitle = "YOU HAVE'NT WON THE GAME!!";
  } else {
    subtitle = "IT'S A DRAW";
  }
  resetGame();
  toggleModal(gameTitle, subtitle, 'PLAY AGAIN');
}

/* Getter function for CARD_LIST */
function getCardList() {
  return CARD_LIST;
}

/* Generate computer's card choices */
function getComputerChoice() {
  // const index = Math.floor(Math.random() * (CARD_LIST.length - 1));
  const index = getRandomInt(0, getCardList().length);
  return getCardList()[index].name;
}

/* Function for flipping cards */
function flipCard() {
  const cardEls = document.querySelectorAll('.battle-card .battle-card__inner');
  if (cardEls.length > 0) {
    cardEls.forEach((el) => {
      el.classList.toggle('rotate');
    });
  }
}

/* Initiate render UI function */
function initRender() {
  playerCardLabel.innerHTML = playerTextLabel;
  playerLabel.innerHTML = playerTextLabel;
  computerCardLabel.innerHTML = computerTextLabel;
  computerLabel.innerHTML = computerTextLabel;

  /* Generating Modals */
  modalCardEl.classList.add('modal-card');
  modalCardHeadEl.classList.add('modal-head');
  modalCardContentEl.classList.add('modal-content');
  modalCardFooterEl.classList.add('modal-footer');
  modalCardHeadEl.append(modalCardHeadingEl);
  modalCardContentEl.append(modalCardContentTextEl);
  modalCardEl.append(modalCardHeadEl, modalCardContentEl, modalCardFooterEl);

  /* Generating Buttons */

  startBtnEl.classList.add('btn-start');
  startBtnEl.innerHTML = 'PLAY';
  startBtnEl.addEventListener('click', startGame);
  modalCardFooterEl.append(startBtnEl);

  // Generate Start button
  deckStartBtnEl.classList.add('deck__start__button');
  deckStartBtnEl.disabled = true;
  deckStartBtnEl.innerHTML = 'START';
  deckStartBtnEl.addEventListener('click', () => {
    document.dispatchEvent(new Event(EVENTS.PLAY));
  });

  getCardList().forEach((card) => {
    // Generate deck buttons
    const deckBtnEl = document.createElement('button');
    deckBtnEl.classList.add('deck__options__item');
    deckBtnEl.setAttribute('id', card.name);
    deckBtnEl.append(card.icon);

    // Select card for player
    deckBtnEl.addEventListener('click', () => {
      resetSelectedButton();
      playerSelection = card.name;
      playerCardEl.textContent = card.icon;
      if (deckStartBtnEl.disabled == true) {
        deckStartBtnEl.disabled = false;
      }
      deckBtnEl.classList.add('selected');
      console.log('cl');
    });
    deckListEl.append(deckBtnEl);
    deckListEl.after(deckStartBtnEl);
    overlayEl.append(modalCardEl);
    bodyEl.append(overlayEl);
  });
  hasInit = true;
}

function startGame() {
  toggleOverlay();
  document.dispatchEvent(new Event(EVENTS.RENDER));
}

/* Function for rendering HP Bar */
function renderHPs() {
  const computerHpEl = document.getElementById('computer-hp');
  const playerHpEl = document.getElementById('player-hp');

  computerHpEl.style.width = computerHP + '%';
  playerHpEl.style.width = playerHP + '%';
}

/* Function for render Overlay */
function toggleModal(headerText = '', contentText = '', buttonText = 'PLAY') {
  modalCardHeadingEl.innerHTML = headerText;
  modalCardContentTextEl.innerHTML = contentText;
  startBtnEl.innerHTML = buttonText;
  toggleOverlay();
}

/* Function for toggling deck buttons */
function toggleDeckButtons() {
  getCardList().forEach((card) => {
    const deckBtn = document.getElementById(card.name);
    if (deckBtn) {
      deckBtn.disabled = !deckBtn.disabled;
      deckBtn.classList.remove('selected');
    }
  });
}

function resetSelectedButton() {
  getCardList().forEach((card) => {
    const deckBtn = document.getElementById(card.name);
    if (deckBtn) {
      deckBtn.classList.remove('selected');
    }
  });
}

/* Function for toggling overlays */
function toggleOverlay() {
  overlayEl.classList.toggle('show');
}

/* utils function */
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}
