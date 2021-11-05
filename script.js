'use strict';
//לקצצר את השורות של dise לפונקציה

const playersEl = document.querySelectorAll(`name`);
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const scoresEl = document.querySelectorAll(`.score`);
const score0El = document.getElementById(`score--0`);
const score1El = document.getElementById(`score--1`);
const message0El = document.getElementById(`message--0`);
const message1El = document.getElementById(`message--1`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);
const newGameEl = document.querySelector(`.btn--new`);
const diceEl = document.querySelector(`.dice`);
const rollDiceEl = document.querySelector(`.btn--roll`);
const holdEl = document.querySelector(`.btn--hold`);
const instructionEl = document.querySelector(`.instruction`);
const btnInstructionEl = document.querySelector(`.btn--instruction`);
const closeInstructionEl = document.querySelector(`.close-instruction`);

for (let i = 0; i < playersEl.length; i++) playersEl[i].textContent = `hi`;

let score0 = 0;
let score1 = 0;
let current0 = 0;
let current1 = 0;

let message0Active = function () {
  message0El.textContent = `your turn`;
  message1El.textContent = `wait`;
};
let message1Active = function () {
  message1El.textContent = `your turn`;
  message0El.textContent = `wait`;
};
let message0Win = function () {
  message0El.textContent = `you win🥳`;
  message1El.textContent = `you lose😭`;
};
let message1Win = function () {
  message1El.textContent = `you win🥳`;
  message0El.textContent = `you lose😭`;
};

let player0Active = function () {
  player1El.classList.remove(`player--active`);
  player0El.classList.add(`player--active`);
  message0Active();
};
let player1Active = function () {
  player0El.classList.remove(`player--active`);
  player1El.classList.add(`player--active`);
  message1Active();
};

let instructionFun = function () {
  if (!instructionEl.classList.contains(`hidden`)) {
    instructionEl.classList.add(`hidden`);
  } else {
    instructionEl.classList.remove(`hidden`);
  }
};

let startingCondition = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add(`hidden`);
  player0Active();
};

let rollDiceFun = function () {
  let rollDice = Math.trunc(Math.random() * 6) + 1;

  if (player0El.classList.contains(`player--active`)) {
    if (rollDice >= 2) {
      diceEl.classList.remove(`hidden`);
      diceEl.src = `dice-${rollDice}.png`;
      current0 += rollDice;
      current0El.textContent = current0;
    } else {
      diceEl.classList.remove(`hidden`);
      diceEl.src = `dice-${rollDice}.png`;
      player1Active();
      current0 = 0;
      current0El.textContent = current0;
    }
  } else if (player1El.classList.contains(`player--active`)) {
    if (rollDice >= 2) {
      diceEl.classList.remove(`hidden`);
      diceEl.src = `dice-${rollDice}.png`;
      current1 += rollDice;
      current1El.textContent = current1;
    } else {
      diceEl.classList.remove(`hidden`);
      diceEl.src = `dice-${rollDice}.png`;
      player0Active();
      current1 = 0;
      current1El.textContent = current1;
    }
  }
};

let holdFun = function () {
  if (player0El.classList.contains(`player--active`)) {
    player1Active();
    score0 = score0 + current0;
    score0El.textContent = score0;
    current0 = 0;
    current0El.textContent = current0;
    if (score0 >= 100) {
      player0El.classList.add(`player--winner`);
      player1El.classList.add(`player--loser`);
      winCondition();
      message0Win();
    }
  } else if (player1El.classList.contains(`player--active`)) {
    player0Active();
    score1 = score1 + current1;
    score1El.textContent = score1;
    current1 = 0;
    current1El.textContent = current1;
    if (score1 >= 100) {
      player1El.classList.add(`player--winner`);
      player0El.classList.add(`player--loser`);
      winCondition();
      message1Win();
    }
  }
};

let winCondition = function () {
  rollDiceEl.classList.add(`hidden`);
  holdEl.classList.add(`hidden`);
  diceEl.classList.add(`hidden`);
};

let newGameFun = function () {
  startingCondition();
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.remove(`player--loser`);
  player1El.classList.remove(`player--loser`);
  rollDiceEl.classList.remove(`hidden`);
  holdEl.classList.remove(`hidden`);
  instructionEl.classList.add(`hidden`);
  score0 = 0;
  score1 = 0;
};

startingCondition();

rollDiceEl.addEventListener(`click`, rollDiceFun);

holdEl.addEventListener(`click`, holdFun);

newGameEl.addEventListener(`click`, newGameFun);

btnInstructionEl.addEventListener(`click`, instructionFun);
closeInstructionEl.addEventListener(`click`, instructionFun);

// document.addEventListener(`keydown`, function (e) {
//   if (e.key === `Enter`) {
//     rollDiceFun();
//   }
// });
