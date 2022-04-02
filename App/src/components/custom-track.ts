const amountSliders = document.querySelectorAll('.header__filter-amount_input'),
  amountLeftValue: HTMLElement = document.querySelector(
    '.header__filter-amount_value-left'
  ),
  amountRightValue: HTMLElement = document.querySelector(
    '.header__filter-amount_value-right'
  );

amountSliders[0].addEventListener('input', (e) => {
  if (+amountSliders[0].value > +amountSliders[1].value) {
    amountSliders[1].value = +amountSliders[0].value;
    amountRightValue.textContent = amountSliders[1].value;
  }
  amountLeftValue.textContent = amountSliders[0].value;
});

amountSliders[1].addEventListener('input', (e) => {
  if (+amountSliders[1].value < +amountSliders[0].value) {
    amountSliders[0].value = +amountSliders[1].value;
    amountLeftValue.textContent = amountSliders[0].value;
  }
  amountRightValue.textContent = amountSliders[1].value;
});

const yearSliders = document.querySelectorAll('.header__filter-year_input'),
  yearLeftValue: HTMLElement = document.querySelector(
    '.header__filter-year_value-left'
  ),
  yearRightValue: HTMLElement = document.querySelector(
    '.header__filter-year_value-right'
  );

yearSliders[0].addEventListener('input', (e) => {
  if (+yearSliders[0].value > +yearSliders[1].value) {
    yearSliders[1].value = +yearSliders[0].value;
    yearRightValue.textContent = yearSliders[1].value;
  }
  yearLeftValue.textContent = yearSliders[0].value;
});

yearSliders[1].addEventListener('input', (e) => {
  if (+yearSliders[1].value < +yearSliders[0].value) {
    yearSliders[0].value = +yearSliders[1].value;
    yearLeftValue.textContent = yearSliders[0].value;
  }
  yearRightValue.textContent = yearSliders[1].value;
});

