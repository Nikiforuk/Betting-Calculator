'use strict';

let form = document.querySelector('.form');
let stake = document.querySelector('#stake');
let coefficient = document.querySelector('#odds');
let gameType = document.querySelector('#gameType');
let potentialWin = document.querySelector('.form__result-value');
let submitBtn = document.querySelector('.form__button');

const historyBetts = [];

const saveBet = {
  stake: null,
  coefficient: null,
  gameType: 'football',
  potentialWin: null,
};

const isValidValue = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
};

const calculateWin = () => {
  const stakeValue = parseFloat(stake.value);
  const oddsValue = parseFloat(coefficient.value);

  if (isValidValue(stakeValue) && isValidValue(oddsValue)) {
    const win = stakeValue * oddsValue;
    potentialWin.textContent = win.toFixed(2);
    saveBet.potentialWin = win;
  } else {
    potentialWin.textContent = '0.00';
    saveBet.potentialWin = null;
  }
};

gameType.addEventListener('change', (e) => {
  saveBet.gameType = e.target.value;
});

stake.addEventListener('input', (e) => {
  let value = e.target.value;

  if (!isValidValue(value)) {
    stake.style.borderColor = 'red';
    saveBet.stake = null;
  } else {
    stake.style.borderColor = '';
    saveBet.stake = parseFloat(value);
  }

  calculateWin();
});

coefficient.addEventListener('input', (e) => {
  let value = e.target.value;

  if (!isValidValue(value)) {
    coefficient.style.borderColor = 'red';
    saveBet.coefficient = null;
  } else {
    coefficient.style.borderColor = '';
    saveBet.coefficient = parseFloat(value);
  }

  calculateWin();
});

submitBtn.addEventListener('click', () => {
  calculateWin();

  if (
    saveBet.stake === null ||
    saveBet.coefficient === null ||
    saveBet.potentialWin === null
  ) {
    stake.style.borderColor = 'red';
    coefficient.style.borderColor = 'red';
  }

  let history = JSON.parse(localStorage.getItem('historyBetts')) || [];
  history.push({...saveBet});

  if (history.length > 5) {
    history = history.slice(history.length - 5);
  }

  localStorage.setItem('historyBetts', JSON.stringify(history));
  console.log('histories the last of betts', history);
});
