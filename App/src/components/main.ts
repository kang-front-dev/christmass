// const navList: HTMLElement = document.querySelector('.header__nav_list'),
//   navUnderline: HTMLElement = document.getElementById('nav-underline'),
//   navLink1: HTMLElement = document.getElementById('nav-link-1'),
//   navLink2: HTMLElement = document.getElementById('nav-link-2');

// navList.addEventListener('click', (e) => {
//   if (e.target === navLink1 || e.target === navLink2) {
//     updatePosition(e.target);
//   }
// });
// function updatePosition(el): void {
//   navUnderline.style.width = el.offsetWidth + 'px';
//   navUnderline.style.left = el.offsetLeft + 'px';
// }

const wrapper:HTMLElement = document.querySelector('.wrapper')

const snowflakeBlock:HTMLElement = document.createElement('div')

snowflakeBlock.className = 'snowflake-block'
wrapper.appendChild(snowflakeBlock)
for (let i = 0; i < 50; i++) {
  let snowflake:HTMLElement = document.createElement('div')
  snowflake.className = 'snowflake'
  snowflakeBlock.appendChild(snowflake)
  
}

const btn: HTMLElement = document.querySelector('.welcome__btn');

const welcome: HTMLElement = document.querySelector('.welcome');

const header: HTMLElement = document.querySelector('.header');
const searchInput:HTMLElement = document.querySelector('.search_input')
btn.addEventListener('click', (): void => {
  btn.classList.add('welcome__btn-animated');
  welcome.classList.add('hidden-animation-slow');
  setTimeout(() => {
    btn.classList.add('hidden-animation-fast');
    setTimeout(() => {
      header.classList.add('header-active');
      btn.classList.add('hidden');
      btn.classList.remove('welcome__btn-animated');
      searchInput.focus()
    }, 300);
    wrapper.classList.add('wrapper-active');
    snowflakeBlock.classList.add('hidden');
    welcome.classList.add('hidden');
    
    
  }, 1300);
});
