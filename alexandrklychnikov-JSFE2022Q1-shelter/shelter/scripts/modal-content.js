import PETS from './pets.js'

const petIndex = {
  Jennifer: 0,
  Sophia: 1,
  Woody: 2,
  Scarlett: 3,
  Katrine: 4,
  Timmy: 5,
  Freddie: 6,
  Charly: 7
}

export default function modalContent (name) {
  let img = name.toLowerCase();
  const path =  document.location.pathname
  let pageName = path.slice(path.lastIndexOf('/') + 1) 
  let imgPath = (pageName === 'pets.html') ? `../../assets/images/pets/${img}.png` : `./assets/images/pets/${img}.png`
  let closePath = (pageName === 'pets.html') ? `../../assets/icons/close.svg` : `./assets/icons/close.svg`
  return `<div class="close-btn"><img src="${closePath}", alt="close"></div>
  <div class="image-content" style="background-image: url(${imgPath})"></div>
    <div class="text-content">
      <div class="wrapper__name">
        <div class="pet-name">${name}</div>
        <div class="pet-type">${PETS[petIndex[name]].type} - ${PETS[petIndex[name]].breed}</div>
      </div>  
      <div class="description">${PETS[petIndex[name]].description}</div>
      <ul class="specificity">
        <li>
          <span class="spec-type">Age:</span>
          <span class="spec-content">${PETS[petIndex[name]].age}</span>
        </li>
        <li>
          <span class="spec-type">Inculations:</span>
          <span class="spec-content">${PETS[petIndex[name]].inoculations.join(',')}</span>
        </li>  
        <li>
          <span class="spec-type">Diseases:</span>
          <span class="spec-content">${PETS[petIndex[name]].diseases.join(',')}</span>
        </li>
        <li>
          <span class="spec-type">Parasites:</span>
          <span class="spec-content">${PETS[petIndex[name]].parasites.join(',')}</span>
        </li>
    </div>`
} 