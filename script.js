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

/////////BANKIST APP

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const eurFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
});

let currentAccount;
// currentAccount = account1;

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

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
    <div class="movements__type movements__type--${type}">#${
      i + 1
    } ${type}</div>
     <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formatedMov}</div>
  </div>`;

    containerMovements.insertAdjacentHTML('beforeend', html);
  });
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat('en-US', {
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
  if (!currentAccount) return;

  const balance = movements.reduce((acc, cur) => acc + cur, 0);

  currentAccount.balance = balance;
  //console.log(balance);
  labelBalance.textContent = formatCur(
    balance,
    currentAccount.locale,
    currentAccount.currency
  );

  return balance;
};

const addBalance = function (accounts) {
  if (!currentAccount) return;

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
  console.log(currentAccount);
  if (converterButton.textContent === 'USD$') {
    labelBalance.textContent = usdFormatter.format(
      currentAccount.balance * 1.02
    );
    converterButton.textContent = 'EUR€';
  } else {
    labelBalance.textContent = eurFormatter.format(currentAccount.balance);
    converterButton.textContent = 'USD$';
  }
});

btnLogin.addEventListener('click', function (event) {
  event.preventDefault();

  const userLogin = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (
    userLogin?.pin === Number(inputLoginPin.value) &&
    userLogin.username === String(inputLoginUsername.value)
  ) {
    currentAccount = userLogin;

    labelWelcome.textContent = `Welcome back , ${
      currentAccount.owner.split(' ')[0]
    }`;

    updateUI(currentAccount);
    containerApp.style.opacity = 100;
    createDate(currentAccount);
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

    calcDisplayBalance(currentAccount.movements);
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
      const date = new Date();
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
if (currentAccount) updateUI(currentAccount);
containerApp.style.opacity = 0;

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
