import data from './data.js';

const headerWrapper: HTMLElement = document.querySelector('.header__wrapper'),
  welcomeBtn: HTMLElement = document.querySelector('.welcome__btn'),
  loader: HTMLElement = document.querySelector('.loader-wrapper');

let lastCardsArray: Array<number> = [],
  fullCardsArray: Array<number> = [];

for (let i = 0; i < 59; i++) {
  fullCardsArray.push(i);
}

function generateCard(cardArray: Array, cardIndex: number) {
  if (cardIndex != cardArray.length) {
    const card: HTMLElement = document.createElement('div');
    card.className = 'header__wrapper_card';
    card.id = `card-${data[cardArray[cardIndex]].num - 1}`;

    const cardImg: HTMLElement = document.createElement('img');
    cardImg.src = `assets/toys/${data[cardArray[cardIndex]].num}.png`;
    cardImg.className = 'header__wrapper_card_img';
    card.appendChild(cardImg);

    const cardTitle: HTMLElement = document.createElement('h2');
    cardTitle.textContent = data[cardArray[cardIndex]].name;
    cardTitle.className = 'header__wrapper_card_title';
    card.appendChild(cardTitle);

    const cardTextBlock: HTMLElement = document.createElement('div');
    cardTextBlock.className = 'header__wrapper_card_text-block';
    card.appendChild(cardTextBlock);

    const cardText1: HTMLElement = document.createElement('p');
    cardText1.textContent = 'Amount: ';
    cardText1.className = 'header__wrapper_card_text';
    const cardText1Span: HTMLElement = document.createElement('span');
    cardText1Span.textContent = data[cardArray[cardIndex]].count;
    cardText1.appendChild(cardText1Span);
    cardTextBlock.appendChild(cardText1);

    const cardText2: HTMLElement = document.createElement('p');
    cardText2.textContent = 'Year: ';
    cardText2.className = 'header__wrapper_card_text';
    const cardText2Span: HTMLElement = document.createElement('span');
    cardText2Span.textContent = data[cardArray[cardIndex]].year;
    cardText2.appendChild(cardText2Span);
    cardTextBlock.appendChild(cardText2);

    const cardText3: HTMLElement = document.createElement('p');
    cardText3.textContent = 'Shape: ';
    cardText3.className = 'header__wrapper_card_text';
    const cardText3Span: HTMLElement = document.createElement('span');
    cardText3Span.textContent = data[cardArray[cardIndex]].shape;
    cardText3.appendChild(cardText3Span);
    cardTextBlock.appendChild(cardText3);

    const cardText4: HTMLElement = document.createElement('p');
    cardText4.textContent = 'Color: ';
    cardText4.className = 'header__wrapper_card_text';
    const cardText4Span: HTMLElement = document.createElement('span');
    cardText4Span.textContent = data[cardArray[cardIndex]].color;
    cardText4.appendChild(cardText4Span);
    cardTextBlock.appendChild(cardText4);

    const cardText5: HTMLElement = document.createElement('p');
    cardText5.textContent = 'Size: ';
    cardText5.className = 'header__wrapper_card_text';
    const cardText5Span: HTMLElement = document.createElement('span');
    cardText5Span.textContent = data[cardArray[cardIndex]].size;
    cardText5.appendChild(cardText5Span);
    cardTextBlock.appendChild(cardText5);

    const cardBtn: HTMLElement = document.createElement('div');
    cardBtn.className = 'header__wrapper_card_btn';
    cardBtn.textContent = 'Add';
    card.appendChild(cardBtn);

    const cardStar: HTMLElement = document.createElement('i');
    if (localStorage.getItem(`toy-${cardArray[cardIndex]}`) === 'true') {
      cardStar.className = 'fas fa-star icon-star';
    } else {
      cardStar.className = 'fal fa-star icon-star';
    }
    card.appendChild(cardStar);

    if (localStorage.getItem(`toy-${[cardArray[cardIndex]]}`) === 'true') {
      const cardRibbon: HTMLElement = document.createElement('span');
      cardRibbon.className = 'header__wrapper_card_ribbon';
      card.appendChild(cardRibbon);
    }

    headerWrapper.appendChild(card);

    generateCard(cardArray, cardIndex + 1);
  } else {
    lastCardsArray = cardArray.splice('');

    let cards = document.querySelectorAll('.header__wrapper_card');
    cards.forEach((item) => {
      item.classList.add('header__wrapper_card-active');
    });
    loader.classList.remove('loader-wrapper-active');
    console.log('boom');
    favoriteProcessBegin();
    errorAppear(lastCardsArray)
    console.log('lastCardsArray',lastCardsArray);
    
  }
}

let cardOptions = {
  shape: [],
  color: [],
  size: [],
  amount: [1, 12],
  year: [1940, 2020],
  favorite: [],
};

function prepareCards(options) {
  deleteCards();
  updateDataFavorite();
  let cardArray: Array = [];

  data.forEach((item) => {
    if (compareTwo(item.shape, options.shape)) {
      if (compareTwo(item.color, options.color)) {
        if (compareTwo(item.size, options.size)) {
          if (
            Number(item.count) >= options.amount[0] &&
            Number(item.count) <= options.amount[1]
          ) {
            if (
              Number(item.year) >= options.year[0] &&
              Number(item.year) <= options.year[1]
            ) {
              if (compareTwo(item.favorite, options.favorite)) {
                cardArray.push(Number(item.num) - 1);
              }
            }
          }
        }
      }
    }
  });
  console.log(cardArray);
  return cardArray;
}


function deleteCards() {
  let cards = document.querySelectorAll('.header__wrapper_card');
  if (cards) {
    cards.forEach((item) => {
      item.remove();
    });
  }
}

function compareTwo(item, array: Array<any>) {
  let state = false;
  if (array.length > 0) {
    array.forEach((arrKey) => {
      if (arrKey === item) {
        state = true;
      }
    });
  } else {
    return true;
  }
  return state;
}

welcomeBtn.addEventListener('click', () => {
  loader.classList.add('loader-wrapper-active');
  generateCard(prepareCards(cardOptions), 0);
});

function favoriteProcessBegin() {
  const cardStars = document.querySelectorAll('.icon-star');

  cardStars.forEach((item) => {
    item.addEventListener('click', (e) => {
      let index;
      const target = e.target as HTMLElement,
        targetParent = target.parentNode as HTMLElement;
      if (targetParent.id.length > 6) {
        index = Number(targetParent.id[5] + targetParent.id[6]);
      } else {
        index = Number(targetParent.id[targetParent.id.length - 1]);
      }

      if (target.classList.contains('fas')) {
        target.classList.remove('fas');
        target.classList.add('fal');
        console.log(index);

        localStorage.removeItem(`toy-${index}`);
        localStorage.setItem(`toy-${index}`, 'false');

        const card = target.parentNode;
        const cardRibbon = card.querySelector('.header__wrapper_card_ribbon');
        cardRibbon.remove();
      } else if (target.classList.contains('fal')) {
        target.classList.remove('fal');
        target.classList.add('fas');

        localStorage.removeItem(`toy-${index}`);
        localStorage.setItem(`toy-${index}`, 'true');

        const card = target.parentNode;
        const cardRibbon: HTMLElement = document.createElement('span');
        cardRibbon.className = 'header__wrapper_card_ribbon';
        card.appendChild(cardRibbon);
      }
      updateDataFavorite();
    });
  });
}

// ===================FILTERS-BUTTONS==========================

const filterShapeBtns = document.querySelectorAll(
    '.header__filter-shape_option'
  ),
  filterColorBtns = document.querySelectorAll('.header__filter-color_option'),
  filterSizeBtns = document.querySelectorAll('.header__filter-size_option');

filterShapeBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.target.classList.toggle('shape-active');
    if (e.target.classList.contains('shape-active')) {
      let shape = e.target.children[0].id,
        index = shape.length - 1;
      if (shape[index] == 1) {
        cardOptions.shape.push('шар');
      } else if (shape[index] == 2) {
        cardOptions.shape.push('снежинка');
      } else if (shape[index] == 3) {
        cardOptions.shape.push('колокольчик');
      } else if (shape[index] == 4) {
        cardOptions.shape.push('шишка');
      } else if (shape[index] == 5) {
        cardOptions.shape.push('фигурка');
      }
      generateCard(prepareCards(cardOptions), 0);
      console.log(shape[shape.length - 1]);
      console.log(cardOptions);
    } else {
      console.log('removing');

      let shape = e.target.children[0].id,
        index = shape.length - 1;
      if (shape[index] == 1) {
        let deleteIndex = cardOptions.shape.indexOf('шар', 0);
        cardOptions.shape.splice(deleteIndex, 1);
      } else if (shape[index] == 2) {
        let deleteIndex = cardOptions.shape.indexOf('снежинка', 0);
        cardOptions.shape.splice(deleteIndex, 1);
      } else if (shape[index] == 3) {
        let deleteIndex = cardOptions.shape.indexOf('колокольчик', 0);
        cardOptions.shape.splice(deleteIndex, 1);
      } else if (shape[index] == 4) {
        let deleteIndex = cardOptions.shape.indexOf('шишка', 0);
        cardOptions.shape.splice(deleteIndex, 1);
      } else if (shape[index] == 5) {
        let deleteIndex = cardOptions.shape.indexOf('фигурка', 0);
        cardOptions.shape.splice(deleteIndex, 1);
      }
      generateCard(prepareCards(cardOptions), 0);
      console.log(cardOptions);
    }
  });
});
filterColorBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.target.classList.toggle('color-active');
    if (e.target.classList.contains('color-active')) {
      let color = e.target.id,
        index = color.length - 1;
      if (color[index] == 1) {
        cardOptions.color.push('белый');
      } else if (color[index] == 2) {
        cardOptions.color.push('красный');
      } else if (color[index] == 3) {
        cardOptions.color.push('желтый');
      } else if (color[index] == 4) {
        cardOptions.color.push('синий');
      } else if (color[index] == 5) {
        cardOptions.color.push('зелёный');
      }
      generateCard(prepareCards(cardOptions), 0);
      console.log(cardOptions);
    } else {
      console.log('removing');

      let color = e.target.id,
        index = color.length - 1;
      if (color[index] == 1) {
        let deleteIndex = cardOptions.color.indexOf('белый', 0);
        cardOptions.color.splice(deleteIndex, 1);
      } else if (color[index] == 2) {
        let deleteIndex = cardOptions.color.indexOf('красный', 0);
        cardOptions.color.splice(deleteIndex, 1);
      } else if (color[index] == 3) {
        let deleteIndex = cardOptions.color.indexOf('желтый', 0);
        cardOptions.color.splice(deleteIndex, 1);
      } else if (color[index] == 4) {
        let deleteIndex = cardOptions.color.indexOf('синий', 0);
        cardOptions.color.splice(deleteIndex, 1);
      } else if (color[index] == 5) {
        let deleteIndex = cardOptions.color.indexOf('зеленый', 0);
        cardOptions.color.splice(deleteIndex, 1);
      }
      generateCard(prepareCards(cardOptions), 0);
      console.log(cardOptions);
    }
  });
});
filterSizeBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.target.classList.toggle('size-active');
    if (e.target.classList.contains('size-active')) {
      let size = e.target.id,
        index = size.length - 1;
      if (size[index] == 1) {
        cardOptions.size.push('большой');
      } else if (size[index] == 2) {
        cardOptions.size.push('средний');
      } else if (size[index] == 3) {
        cardOptions.size.push('малый');
      }
      generateCard(prepareCards(cardOptions), 0);
      console.log(cardOptions);
    } else {
      console.log('removing');

      let size = e.target.id,
        index = size.length - 1;
      if (size[index] == 1) {
        let deleteIndex = cardOptions.size.indexOf('большой', 0);
        cardOptions.size.splice(deleteIndex, 1);
      } else if (size[index] == 2) {
        let deleteIndex = cardOptions.size.indexOf('средний', 0);
        cardOptions.size.splice(deleteIndex, 1);
      } else if (size[index] == 3) {
        let deleteIndex = cardOptions.size.indexOf('малый', 0);
        cardOptions.size.splice(deleteIndex, 1);
      }
      generateCard(prepareCards(cardOptions), 0);
      console.log(cardOptions);
    }
  });
});

const amountInputs = document.querySelectorAll('.header__filter-amount_input'),
  yearInputs = document.querySelectorAll('.header__filter-year_input');

amountInputs.forEach((item) => {
  item.addEventListener('input', (e) => {
    if (e.target == amountInputs[0]) {
      cardOptions.amount[0] = Number(e.target.value);
      console.log(cardOptions);

      generateCard(prepareCards(cardOptions), 0);
    } else {
      cardOptions.amount[1] = Number(e.target.value);
      console.log(cardOptions);

      generateCard(prepareCards(cardOptions), 0);
    }
  });
});
yearInputs.forEach((item) => {
  item.addEventListener('input', (e) => {
    if (e.target == yearInputs[0]) {
      cardOptions.year[0] = Number(e.target.value);
      console.log(cardOptions);

      generateCard(prepareCards(cardOptions), 0);
    } else {
      cardOptions.year[1] = Number(e.target.value);
      console.log(cardOptions);

      generateCard(prepareCards(cardOptions), 0);
    }
  });
});

const amountLeftValue: HTMLElement = document.querySelector(
    '.header__filter-amount_value-left'
  ),
  amountRightValue: HTMLElement = document.querySelector(
    '.header__filter-amount_value-right'
  );

const yearLeftValue: HTMLElement = document.querySelector(
    '.header__filter-year_value-left'
  ),
  yearRightValue: HTMLElement = document.querySelector(
    '.header__filter-year_value-right'
  );

function updateDataFavorite() {
  data.forEach((item, index) => {
    if (localStorage.getItem(`toy-${index}`)) {
      item.favorite = localStorage.getItem(`toy-${index}`);
    } else {
      localStorage.setItem(`toy-${index}`, item.favorite);
    }
  });
}
updateDataFavorite();

const favoriteBtn: HTMLElement = document.querySelector(
  '.header__filter-favorite_btn'
);
const favoriteBtnBack: HTMLElement = document.querySelector(
  '.header__filter-favorite_btn-background'
);
favoriteBtn.addEventListener('click', (e) => {
  favoriteBtnToggle(e.target);
});
function favoriteBtnToggle(item) {
  if (
    item === favoriteBtn.children[0] &&
    !favoriteBtn.children[0].classList.contains(
      'header__filter-favorite_btn-active'
    )
  ) {
    favoriteBtn.children[0].classList.add('header__filter-favorite_btn-active');
    favoriteBtn.children[1].classList.remove(
      'header__filter-favorite_btn-active'
    );
    favoriteBtnBack.style.left = favoriteBtn.children[0].offsetLeft + 'px';
    cardOptions.favorite = ['true'];
    generateCard(prepareCards(cardOptions), 0);
  } else if (
    item === favoriteBtn.children[1] &&
    !favoriteBtn.children[1].classList.contains(
      'header__filter-favorite_btn-active'
    )
  ) {
    favoriteBtn.children[0].classList.remove(
      'header__filter-favorite_btn-active'
    );
    favoriteBtn.children[1].classList.add('header__filter-favorite_btn-active');
    favoriteBtnBack.style.left = favoriteBtn.children[1].offsetLeft + 'px';
    cardOptions.favorite = [];
    generateCard(prepareCards(cardOptions), 0);
  }
}

const resetFilter = document.querySelector('.header__filter-reset');

resetFilter.addEventListener('click', (e) => {
  if (e.target === resetFilter.children[0]) {
    favoriteBtnToggle(favoriteBtn.children[1]);

    filterShapeBtns.forEach((item) => {
      if (item.classList.contains('shape-active')) {
        item.classList.remove('shape-active');
      }
    });
    filterColorBtns.forEach((item) => {
      if (item.classList.contains('color-active')) {
        item.classList.remove('color-active');
      }
    });
    filterSizeBtns.forEach((item) => {
      if (item.classList.contains('size-active')) {
        item.classList.remove('size-active');
      }
    });

    amountInputs.forEach((item, index) => {
      if (index === 0) {
        item.value = 1;
        amountLeftValue.textContent = '1';
      } else {
        item.value = 10;
        amountRightValue.textContent = '10';
      }
    });
    yearInputs.forEach((item, index) => {
      if (index === 0) {
        item.value = 1940;
        yearLeftValue.textContent = '1940';
      } else {
        item.value = 2020;
        yearRightValue.textContent = '2020';
      }
    });

    cardOptions = {
      shape: [],
      color: [],
      size: [],
      amount: [1, 10],
      year: [1940, 2020],
      favorite: [],
    };
    resetSort();
    generateCard(prepareCards(cardOptions), 0);
  } else if (e.target === resetFilter.children[1]) {
    for (let i = 0; i < 60; i++) {
      localStorage.removeItem(`toy-${i}`);
      localStorage.setItem(`toy-${i}`, 'false');
    }
    console.log(cardOptions);
    updateDataFavorite();
    generateCard(prepareCards(cardOptions), 0);
  }
});

// ==========================SORTING===============================

function sortCards(cardsArr: Array<number>, mode: string) {
  console.log(cardsArr);

  const preparedArray = [];

  if (mode === 'ab' || mode === 'ba') {
    cardsArr.forEach((item) => {
      preparedArray.push([
        data[item].name,
        data[item].name[0],
        data[item].color,
        data[item].size,
        data[item].year,
        data[item].count,
      ]);
    });
    preparedArray.sort();
    console.log(preparedArray);
  } else if (mode === '12' || mode === '21') {
    cardsArr.forEach((item) => {
      preparedArray.push([
        data[item].name,
        data[item].name[0],
        data[item].color,
        data[item].size,
        data[item].year,
        data[item].count,
      ]);
    });
    preparedArray.sort((a, b) => {
      return a[4] - b[4];
    });
    console.log(preparedArray);
  }

  if (mode === 'ba' || mode === '21') {
    preparedArray.reverse();
  }

  const outputArr = [];

  if (mode === 'ab' || mode === 'ba') {
    preparedArray.forEach((card) => {
      data.forEach((key, index) => {
        if (
          key.name === card[0] &&
          key.color === card[2] &&
          key.size === card[3] &&
          key.year === card[4] &&
          key.count === card[5]
        ) {
          outputArr.push(index);
        }
      });
    });
  } else if (mode === '12' || mode === '21') {
    preparedArray.forEach((card) => {
      data.forEach((key, index) => {
        if (
          key.name === card[0] &&
          key.color === card[2] &&
          key.size === card[3] &&
          key.year === card[4] &&
          key.count === card[5]
        ) {
          outputArr.push(index);
        }
      });
    });
  }

  console.log('output', outputArr);

  deleteCards();
  updateDataFavorite();
  generateCard(outputArr, 0);
}

const sortBlock: HTMLElement = document.querySelector('.header__sort'),
  sortList: HTMLElement = document.querySelector('.header__sort_list'),
  sortBlockSpan: HTMLElement = sortBlock.querySelector('span'),
  listOptions = document.querySelectorAll('.header__sort_option');

sortBlock.addEventListener('click', (e) => {
  if (sortBlock.classList.contains('header__sort-active')) {
    sortBlock.classList.remove('header__sort-active');
  } else {
    sortBlock.classList.add('header__sort-active');
  }

  if (e.target !== sortList && e.target !== sortBlock) {
    const sortOption = e.target as HTMLElement;
    sortBlockSpan.textContent = sortOption.textContent;
  }
  if (e.target === listOptions[0]) {
    sortCards(lastCardsArray, 'ab');
  } else if (e.target === listOptions[1]) {
    sortCards(lastCardsArray, 'ba');
  } else if (e.target === listOptions[2]) {
    sortCards(lastCardsArray, '12');
  } else if (e.target === listOptions[3]) {
    sortCards(lastCardsArray, '21');
  }
});

function resetSort() {
  sortBlockSpan.textContent = 'от А до Я';
}

// ===========================SEARCHING===============================

function searchCards(arr: Array<number>, searchString: string) {
  const newArr = [];
  arr.forEach((key, index) => {
    const str = searchString.toLowerCase();
    if (data[key].name.toLowerCase().includes(str)) {
      newArr.push(index);
    }
  });


  deleteCards();
  generateCard(newArr, 0);
}

const searchInput: HTMLElement = document.querySelector('.search_input'),
  searchBtn: HTMLElement = document.querySelector('.icon-search'),
  searchBtnDelete: HTMLElement = document.querySelector('.icon-times'),
  errorBlock:HTMLElement = document.querySelector('.error')

searchInput.addEventListener('input', () => {
  setTimeout(() => {
    searchCards(fullCardsArray, searchInput.value);
  });
});

function errorAppear(arr){
  console.log('current arr',arr);
  
  if (arr.length === 0) {
    console.log('hide');
    
    errorBlock.classList.remove('error-hidden')
  }else if(!errorBlock.classList.contains('error-hidden')){
    errorBlock.classList.add('error-hidden')
  }
}