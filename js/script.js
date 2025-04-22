'use strictly';

// Cache selectors
const playerEls = [
  document.querySelector('.player--0'),
  document.querySelector('.player--1')
];
const scoreEls = [
  document.getElementById('score--0'),
  document.getElementById('score--1')
];
const currentEls = [
  document.getElementById('current--0'),
  document.getElementById('current--1')
];
const winsEls = [
  document.getElementById('wins--0'),
  document.getElementById('wins--1')
];
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const inpbox = document.querySelector('#goal');
let scores, currentScore, activePlayer, playing,
  playersWinningCount = [0, 0]; // track match wins
const bestOf = 3; // first to 3 wins
let goalScore = 100; // dynamic via input (not yet wired)

const init = () =>
{
  if (playersWinningCount[0] === bestOf || playersWinningCount[1] === bestOf) {
    playersWinningCount = [0, 0]; // reset match wins
    scoreEls.forEach(el => el.textContent = '0'); // reset scores
    winsEls.forEach(el => el.textContent = '🏅 : 0');
    playerEls.forEach(el => el.classList.remove('final--winner'));// reset match wins display
    inpbox.parentElement.classList.remove('hidden'); // show input when game starts
  }
  scores = [0, 0];
  currentScore = 0;
  playerEls.forEach(el => el.classList.remove('player--active'));
  activePlayer = Math.round(Math.random());
  playerEls[activePlayer].classList.add('player--active');
  playing = true;


  // reset UI
  scoreEls.forEach(el => el.textContent = '0');
  currentEls.forEach(el => el.textContent = '0');
  diceEl.classList.add('hidden');
  playerEls.forEach(el => el.classList.remove('player--winner'));
};
init();

const switchPlayer = () =>
{
  currentEls[activePlayer].textContent = '0';
  currentScore = 0;
  playerEls[activePlayer].classList.toggle('player--active');
  activePlayer = 1 - activePlayer;
  playerEls[activePlayer].classList.toggle('player--active');
};

btnRoll.addEventListener('click', () =>
{
  if (!playing) return; // guard clause for clarity
  const dice = Math.floor(Math.random() * 6) + 1; // floor is more semantically clear
  diceEl.src = `dice-${dice}.png`;
  diceEl.classList.remove('hidden');

  if (dice !== 1) {
    currentScore += dice;
    currentEls[activePlayer].textContent = currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', () =>
{
  if (!playing) return;
  scores[activePlayer] += currentScore;
  scoreEls[activePlayer].textContent = scores[activePlayer];

  // single source for win condition
  if (scores[activePlayer] >= goalScore) {
    playing = false;
    diceEl.classList.add('hidden');

    // update match wins and check best-of
    playersWinningCount[activePlayer]++;
    winsEls[activePlayer].textContent = `🏅 : ${playersWinningCount[activePlayer]}`;
    if (playersWinningCount[activePlayer] >= bestOf) {
      setTimeout(() => playerEls[activePlayer].classList.add('final--winner'), 100);
    }
    playerEls[activePlayer].classList.add('player--winner');

  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);

inpbox.addEventListener('keydown', (e) =>
{
  if (e.key === 'Enter') {
    const val = +inpbox.value;

    if (val < 10 || val > 100 || isNaN(val)) {
      alert('Please enter a number between 10 and 100');
      inpbox.focus();
      return;
    }

    goalScore = val;
    inpbox.value = '';
    inpbox.parentElement.classList.add('hidden') // hide input when game starts
  }


});