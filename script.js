'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data 1
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

//Data 2
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
let inputLoginUsername = document.querySelector('.login__input--user');
let inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
//selfmade button
const converterButton = document.querySelector('.convert-btn');
const convertParagraph = document.querySelectorAll('conver-p');
const balanceDate = document.querySelector('.date');
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////BANKIST APP

let currentAccount;
currentAccount = account1;

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  // console.log(account1);

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(currentAccount.movementsDates[i]);
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const displayDate = new Intl.DateTimeFormat('en-GB').format(date);
    //const displayDate = `${day}/${month}/${year},${hour}:${minutes}`;
    //labelDate.textContent = displayDate;
    const daysPassed = function (date1) {
      return date1 / (1000 * 60 * 60 * 24);
    };
    const displayDays = daysPassed(
      // new Date(year, month, day)
      new Date(currentAccount.movements[i])
    );
    const formatedMov = formatCur(
      mov,
      currentAccount.locale,
      currentAccount.currency
    );
    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
     <div class="movements__date">${displayDate}  </div>
    <div class="movements__value">${formatedMov}</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(currentAccount.locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
const eurToUsd = 0.99;
const movements = [200, 0, 0, 0, -200, 340, -300, -20, 50, 400, -460];
const movementsUSD = movements.map(mov => (mov * eurToUsd).toFixed(2));
const movementsUSDfor = [];

const movementsDes = movements.map((mov, i, arr) => {
  if (mov > 0) {
    return `Movement ${i + 1}:You deposited ${mov}`;
  } else {
    return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
  }
});

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
    //return username;
  });
};

createUsernames(accounts);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, cur) => acc + cur, 0);
  //console.log(balance);
  labelBalance.textContent = formatCur(
    currentAccount.balance,
    currentAccount.locale,
    currentAccount.currency
  );
  return balance;
};

const addBalance = function (accounts) {
  const balances = accounts.forEach(mov => {
    const balance = calcDisplayBalance(mov.movements);
    mov.balance = balance.toFixed(2);
  });
};
addBalance(accounts);
// const x = createUsernames(account1);

const converterUSD = function (movements) {
  const depositsUSD = movements
    .filter(mov => mov > 0)
    .map(mov => mov * eurToUsd)
    .reduce((acc, mov) => acc + mov);

  return depositsUSD.toFixed(2);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((mov, acc) => mov + acc);
  labelSumOut.textContent = `${Math.abs(outcomes.toFixed(2))}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, interest) => acc + interest);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

converterButton.addEventListener('click', function () {
  if (converterButton.textContent === 'USD$') {
    const convert1 = converterUSD(currentAccount.movements);
    labelBalance.textContent = `${convert1}$`;
    converterButton.textContent = 'EUR€';
  } else {
    const convert2 = calcDisplayBalance(currentAccount.movements);
    labelBalance.textContent = `${convert2}€`;
    converterButton.textContent = 'USD$';
  }
});

btnLogin.addEventListener('click', function (event) {
  event.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (
    currentAccount?.pin === Number(inputLoginPin.value) &&
    currentAccount.username === String(inputLoginUsername.value)
  ) {
    labelWelcome.textContent = `Welcome back , ${
      currentAccount.owner.split(' ')[0]
    }`;
    updateUI(currentAccount);
    containerApp.style.opacity = 100;

    inputLoginUsername.textContent = '';
    inputLoginPin.textContent = '';
  } else {
    labelWelcome.textContent = `Wrong username or password , please try again!`;
  }
});
let isSorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  const unsorted = currentAccount.movements;
  console.log(currentAccount.movements);
  console.log(unsorted);

  const sorted = [...currentAccount.movements].sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
  });
  // const test = currentAccount.movements.filter(a => a < 0);
  console.log(unsorted);
  console.log(sorted);

  // console.log(account1);
  // console.log({ sorted });

  if (isSorted === false) {
    displayMovements(sorted);
    console.log({ unsorted });
    console.log({ sorted });

    //console.log(sorted);
    isSorted = true;
  } else if (isSorted === true) {
    displayMovements(unsorted);
    console.log({ unsorted });
    isSorted = false;
  }
});

const updateUI = function (acc) {
  calcDisplayBalance(acc.movements);
  calcDisplaySummary(acc);
  displayMovements(acc.movements);
  converterUSD(acc.movements);
};

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  console.log(amount);
  const accountToTransfer = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  if (accountToTransfer) {
    accountToTransfer.movements.push(amount);
    currentAccount.movements.push(-amount);
    createDate(currentAccount);
    updateUI(currentAccount);
  } else {
    console.log('Wrong username input !');
  }
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amountt = Number(inputLoanAmount.value);

  if (
    amountt > 0 &&
    currentAccount.movements.some(mov => mov >= amountt * 0.1)
  ) {
    setTimeout(function () {
      currentAccount.movements.push(amountt);
      currentAccount.movementsDates.push(new Date());
      updateUI(currentAccount);
      createDate(currentAccount);
      const date = new Date(currentAccount.movements);
      const day = `${date.getDate()}`.padStart(2, 0);
      const month = `${date.getMonth() + 1}`.padStart(2, 0);
      const year = date.getFullYear();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      labelDate.textContent = `${day}/${month}/${year} , ${hour}:${minutes}`;
    }, 3000);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.username === String(inputCloseUsername.value) &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    containerApp.style = 'opacity:0';
    document.querySelector(
      '.welcome'
    ).textContent = `Thank you ${currentAccount.owner} , reload the page to login again !`;
  }
});
//currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

const createDate = acc => {
  const now = new Date();
  const day = `${now.getDate()}`.padStart(2, 0);
  const month = `${now.getMonth()}`.padStart(2, 0);
  const year = now.getFullYear();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  acc.movementsDates.push(now);
  labelDate.textContent = `${day}/${month}/${year} , ${hour}:${minutes}`;
};

// const ingredients = ['olives', 'spinach'];

// const pizzaTimer = setTimeout(
//   (ing1, ing2) => console.log(`Here is your pizza with ${ing1},${ing2}`),
//   5000,
//   ...ingredients
// );
// console.log('waiting');
// if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);
// const locale = navigator.language;
// console.log(locale);

// const num = 3884764.23;
// const options = {
//   style: 'unit',
//   unit: 'celsius',
// };
// console.log('US:', new Intl.NumberFormat('en-US', options).format(num));
// console.log('DE:', new Intl.NumberFormat('de-DE', options).format(num));
// console.log('Sy:', new Intl.NumberFormat('ar-SY', options).format(num));

//console.log(dayss);

// const now = new Date();
// const day = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth()}`.padStart(2, 0);
// const year = now.getFullYear();
// const hour = now.getHours();
// const minutes = now.getMinutes();
// labelDate.textContent = `${day}/${month}/${year} , ${hour}:${minutes}`;
///////////////////////////////////////////////////////////////////////////////////////

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(Number(future));

//console.log(new Array(1, 2, 3, 4, 5, 6, 7, 8));
// const x = new Array(7);
//x.fill(4);
//console.log(x);

// const arr = [1, 2, 3, 4, 5, 6, 7];
//x.fill(1);
//arr.fill(69, 1, 5);
// console.log(arr);
// console.log(x);
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 7 }, (cur, i) => {
//   console.log(cur, i);
// });
//console.log(z);
//clicking the price
// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value')
//   );
//   console.log(movementsUI.map(el => Number(el.textContent.replace('€', ''))));
// });

//LECTURES
// const now = new Date();
// console.log(now);
// console.log(new Date('March 23,2002'));
// console.log(new Date(account1.movementsDates[0]));
// console.log(Math.sqrt(4));
// console.log(8 ** (1 / 3));
// const arr = [12, 2, 4, 5, 99, 1];
// console.log(Math.max(...arr));
// console.log(Math.min(...arr));

// console.log(Math.trunc(Math.random() * 6) + 1);
// const randomInt = (min, max) =>
//   Math.trunc(Math.random() * (max - min) + 1) + min;
// console.log(randomInt(10, 20));
// console.log(23 === 23.0);
// console.log(1 / 10);
// console.log(3 / 10);
// console.log(0.1 + 0.2);
//1.
// const bankDepositSums = accounts
//   .flatMap(acc => acc.movements)
//   .filter(dep => dep > 0)
//   .reduce((sum, cur) => sum + cur, 0);
// console.log(bankDepositSums);

//2.
// const numDeposits = accounts
//   .map(val => val.movements)
//   .flat()
//   .filter(val => val >= 1000);
// console.log(numDeposits.length);

//3.
// const { deposits, withdrawals } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sum, cur) => {
//       cur > 0 ? (sum.deposits += cur) : (sum.withdrawals += cur);
//       sum.movs += 1;
//       return sum;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );
// console.log(deposits, withdrawals);
//.4
// const convertTitleCase = function (title) {
//   console.log(convertTitleCase('This is a nice title'));
//   console.log(convertTitleCase('This is a long title'));
// };

// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners);
// console.log(owners.sort());

// console.log(movements);
// console.log(movements.sort());

// const y = movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
// console.log(y);
// console.log(movements);
// console.log(movements.includes(0));

// const accMoves = movements.some(mov => mov === 400);
// console.log(accMoves);

// const accDeposits = movements.every(mov => mov > 0 || mov < 0);
// console.log(accDeposits);

// console.log(account2);

// const z = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(z);

// console.log(accounts);
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);
//UNCOMMENT FROM HERE ^^^^^

// console.log(x);

// const totalDepositUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(movements);
// console.log(totalDepositUSD);
// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(movements);
// console.log(deposits);

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// const max = movements.reduce((acc, mov) => {
//   // console.log(mov);
//   // console.log(acc);
//   console.log(mov);
//   if (acc > mov) {
//     return acc;
//   } else {
//     return mov;
//   }
// }, movements[1]);

// console.log(max);

//#CHALENGEEE 2
// const data1 = [5, 2, 4, 1, 15, 8, 3];
// const data2 = [16, 6, 10, 5, 6, 1, 4];

// const ageAverage = function (data) {
//   const avg = data
//     .filter(dat => dat > 2)
//     .map(dat => 16 + dat * 4)
//     .reduce((dat, nn) => (dat + nn) / data.length);
//   console.log(avg);
// };
// ageAverage(data1);

// const calcAverage = function (ages) {
//   const humanAge = ages.map(age => {
//     if (age <= 2) {
//       return 2 * age;
//     } else if (age > 2) {
//       return 16 + age * 4;
//     }
//   });
//   return humanAge;
// };

// const filteredAge = function (ages) {
//   const dogAge = ages.filter(age => {
//     if (age > 18) {
//       return age;
//     }
//   });
//   return dogAge;
// };
// const av1 = calcAverage(data1);
// const av2 = calcAverage(data2);
// console.log(av1);
// console.log(av2);

// const filtered1 = filteredAge(av1);
// console.log(filtered1);
// const filtered2 = filteredAge(av2);
// console.log(filtered2);

// const adultAvg = function (ages) {
//   let x = ages.length;
//   const res = ages.reduce(function (age, cur) {
//     return age + cur;
//   });

//   return res / x;
// };
// const avg1 = adultAvg(filtered1);
// console.log(avg1);

// //const y = filtered1.reduce();
// const avg2 = adultAvg(filtered2);
// console.log(avg2.toFixed(2));
