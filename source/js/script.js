'use strict';

function listener(selector, event, callBack) {
  return selector.addEventListener(event, callBack);
}

function selector(selector) {
  return document.querySelector(selector);
}

const input = selector('input');
const hintMssg = selector('.hint');
const guessCount = selector('span');
const submit = selector('.submit');
const restartBtn = selector('.restart');
const body = selector('body');

let number = random(0, 10);
let count = 0;

guessCount.innerText = count;
hintMssg.innerText = 'Guess a number';
input.focus();

listener(submit, 'click', () => {
  checkData()
});

listener(input, 'keydown', (event) => {
  if (event.key === 'Enter') {
    //prevent reloading when submit
    event.preventDefault();
    checkData();
  }
});

listener(restartBtn, 'click', () => {
  restart();
});

listener(body, 'click', () => {
  input.focus();
});

function validate() {
  let userGuess = Number(input.value);
  input.value = '';
  if (userGuess > 10) {
    hintMssg.innerText = 'Number is lesser than 10';
    return false;
  } 
  if (userGuess < 0) {
    hintMssg.innerText = 'Number is greater than 0';
    return false;
  }

  return true;
}

function checkData() {
  if (isCorrect()) {
    hintMssg.innerText = `${number} is correct!`;
  } else printHint();

  input.value = '';
}

function restart() {
  count = 0;
  guessCount.innerText = count;
  number = random(0, 10);
  hintMssg.innerText = 'Guess a number';
}

function isCorrect() {
  let userGuess = Number(input.value);
  if (userGuess === number) {
    return true;
  } 
  return false;
}

function printHint() {
  let userGuess = Number(input.value);
  count++;
  guessCount.innerText = count;
  if (userGuess > number) {
    hintMssg.innerText = 'Number is lesser';
  } else {
    hintMssg.innerText = 'Number is greater';
  }
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}