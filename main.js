'use strict';

let form = document.querySelector('.form');
let stake = document.querySelector('#stake');
let coefficient = document.querySelector('#odds');
let gameType = document.querySelector('#gameType');
let potentialWin = document.querySelector('.form__result-value');
let submitBtn = document.querySelector('.form__button');
let firstErrorText = document.querySelector('#first-error');
let secondErrorText = document.querySelector('#second-error');

const historyBetts = [];

const saveBet = {
  stake: null,
  coefficient: null,
  gameType: 'football',
  potentialWin: null,
};

const isValidValue = (value) => {
  return /^(\d+(\.\d+)?)$/.test(value) && Number(value) > 0;
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
    firstErrorText.textContent = 'Please enter a bid here';
    stake.style.borderColor = 'rgb(196, 41, 41)';
    saveBet.stake = null;
  } else {
    firstErrorText.textContent = '';
    stake.style.borderColor = '';
    saveBet.stake = parseFloat(value);
  }

  calculateWin();
});

coefficient.addEventListener('input', (e) => {
  let value = e.target.value;

  if (!isValidValue(value)) {
    secondErrorText.textContent = 'Please enter a coefficient here';
    coefficient.style.borderColor = 'rgb(196, 41, 41)';
    saveBet.coefficient = null;
  } else {
    secondErrorText.textContent = '';
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
    firstErrorText.textContent = 'Please enter a bid here';
    secondErrorText.textContent = 'Please enter a coefficient here';
    stake.style.borderColor = 'rgb(196, 41, 41)';
    coefficient.style.borderColor = 'rgb(196, 41, 41)';
  } else {
    const resetText = () => {
      submitBtn.textContent = 'Save Your Bet';
      submitBtn.style.cursor = 'default';
    }
    
    submitBtn.textContent = 'Saved';
    setTimeout(resetText, 1500);

    let history = JSON.parse(localStorage.getItem('historyBetts')) || [];
    history.push({...saveBet});

    if (history.length > 5) {
      history = history.slice(history.length - 5);
    }

    localStorage.setItem('historyBetts', JSON.stringify(history));
    console.log('histories the last of betts', history);
  }
});
