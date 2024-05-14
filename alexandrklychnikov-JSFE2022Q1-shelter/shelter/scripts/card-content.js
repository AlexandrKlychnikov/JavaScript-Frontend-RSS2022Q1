export default function cardContent (name) {
  let img = name.toLowerCase();
  const path =  document.location.pathname
  let pageName = path.slice(path.lastIndexOf('/') + 1) 
  let imgPath = (pageName === 'pets.html') ? `../../assets/images/pets/${img}.png` : `./assets/images/pets/${img}.png`
  return `<div class="image-content" style="background: url(${imgPath})"></div>
    <div class="pet-name">${name}</div>
    <div class="button card-btn">Learn more</div>`
} 