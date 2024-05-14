import modalContent from "./modal-content.js"

const cardContainer = document.querySelector('.card-container')
const gallery = document.querySelector('.gallery')
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.modal-overlay')
const window = document.querySelector('.modal-window')

function activateModal(event) {
  if(event.target.closest('.card')) {
    let name = event.target.closest('.card').children[1].textContent
    modal.classList.add('active')
    overlay.classList.add('active')
    document.body.classList.add('inactive')
    window.innerHTML = modalContent(name)
    const close = document.querySelector('.close-btn')
    close.addEventListener('click', handleClose) 
  }
}

function closeModal(event) {
  if(!event.target.closest('.modal')) {
    modal.classList.remove('active')
    overlay.classList.remove('active')
    document.body.classList.remove('inactive')
  }
}

function handleClose() {
    modal.classList.remove('active')
    overlay.classList.remove('active')
    document.body.classList.remove('inactive')
}

export default function popup() {
  if(cardContainer) cardContainer.addEventListener('click', activateModal)
  if(gallery) gallery.addEventListener('click', activateModal)
  overlay.addEventListener('click', closeModal)
}
