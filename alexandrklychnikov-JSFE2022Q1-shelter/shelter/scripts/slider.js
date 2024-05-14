import PETS from './pets.js'
import cardContent from './card-content.js'

const WRAPPERS = document.querySelectorAll('.card-wrapper')
const LEFT = document.querySelector('.arrow.left');
const RIGHT = document.querySelector('.arrow.right');

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

const randomName = (pets) => {
  const randomNumber = getRandomIntInclusive(1, pets.length)
  const name = pets[randomNumber - 1]
  pets.splice(randomNumber - 1, 1)
  return name
} 

const removeItems = (dir) => {
    const pos = (dir === 'left') ? 1 : 0 
    wrap.remove()
}

const slideMove = (event) => {
  const CURRENT_PETS = []
  const current_pets = document.querySelectorAll('.pet-name')
  for(let pet of current_pets) {
    CURRENT_PETS.push(pet.textContent)
  }
  const REST_PETS = PETS.reduce((acc, cur) => {
    if (!CURRENT_PETS.includes(cur.name)) acc.push(cur.name)
    return acc
  }, [])
  LEFT.removeEventListener('click', slideMove)
  RIGHT.removeEventListener('click', slideMove)
  const direction = event.currentTarget.classList.contains('left') ? 'left' : 'right'
  LEFT.style.cursor = 'auto'
  RIGHT.style.cursor = 'auto'
  const visibleWrappers = [...WRAPPERS].filter(w => window.getComputedStyle(w).display !== 'none')
  visibleWrappers.forEach(wrap => {
      let card = document.createElement("div");
      card.className = 'card'
      card.innerHTML = cardContent(randomName(REST_PETS))

      if (direction === 'left') {
        wrap.style.justifyContent = 'end'
        wrap.prepend(card)
        card.classList.add('transition-left')
        const cards = document.querySelectorAll('.card')
        cards.forEach(card => {
          card.classList.add(('transition-left')) 
          card.addEventListener("animationend", () => {
            card.classList.remove('transition-left')
            if (card.previousSibling) {
              const name = card.querySelector('.pet-name').textContent
              REST_PETS.push(name)
              card.remove()
            }  
            LEFT.addEventListener('click', slideMove)
            RIGHT.addEventListener('click', slideMove)
            LEFT.style.cursor = 'pointer'
            RIGHT.style.cursor = 'pointer'
          })
        })
      } else {  // TODO сделать рефакторинг left/right функции
        wrap.style.justifyContent = 'start'
        wrap.append(card)
        card.classList.add('transition-right')
        const cards = document.querySelectorAll('.card')
        cards.forEach(card => {
          card.classList.add('transition-right')
          card.addEventListener("animationend", () => {
            card.classList.remove('transition-right')
            if (card.nextSibling) {
              const name = card.querySelector('.pet-name').textContent
              REST_PETS.push(name)
              card.remove()
            }  
            LEFT.addEventListener('click', slideMove)
            RIGHT.addEventListener('click', slideMove)
            LEFT.style.cursor = 'pointer'
            RIGHT.style.cursor = 'pointer'
          })
        })      
      }  
    })   
} 

export default function slider() {
  if (LEFT && RIGHT) {
    LEFT.addEventListener('click', slideMove)
    RIGHT.addEventListener('click', slideMove)
  }
}
