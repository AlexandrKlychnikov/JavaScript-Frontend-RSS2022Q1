
const burgerIcon = document.querySelector('.mobile-menu')
const burgerMenu = document.querySelector('.menu')
const overlay = document.querySelector('.fixed-overlay')

function actionBurger() {
  burgerIcon.classList.toggle('active')
  burgerMenu.classList.toggle('active')
  overlay.classList.toggle('active')
  document.body.classList.toggle('inactive')
}

function closeMenu (event) {
  if(event.target.classList.contains('nav-link') || event.target.classList.contains('fixed-overlay')) {
    burgerIcon.classList.toggle('active')
    burgerMenu.classList.toggle('active')
    overlay.classList.toggle('active')
    document.body.classList.toggle('inactive')
  }
}

export default function burger() {
  burgerIcon.addEventListener('click', actionBurger)
  burgerMenu.addEventListener('click',  closeMenu)
  overlay.addEventListener('click',  closeMenu)
}