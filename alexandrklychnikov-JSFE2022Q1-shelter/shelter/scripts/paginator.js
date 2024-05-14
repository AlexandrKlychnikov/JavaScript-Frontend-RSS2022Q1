import PETS from './pets.js';
import shuffle from './shuffle.js';
import cardContent from './card-content.js';

const PAGE_CONTROLS = document.querySelector('.page-controls');
const WRAPPERS = document.querySelectorAll('.card-wrapper')
const visibleWrappers = [...WRAPPERS].filter(w => window.getComputedStyle(w).display !== 'none')
let pages;

function pageContent () {
  const pages = [...Array(6)].reduce((acc, cur) => {
    const newPage = PETS.reduce((acc, cur) => {
      acc.push(cur.name);
      return acc;
    }, []);
    acc.push(newPage);
    return acc; 
  }, [])

  if (visibleWrappers.length === 8) {
    pages.forEach(arr => shuffle(arr));
    return pages
  } else if (visibleWrappers.length === 6) {
    let baseArr = pages.flat()
    let newPages = [...Array(8)].reduce((acc, cur, i) => {
      let newArr = []
      for (let i = 0; i < 6; i++) {
        newArr.push(baseArr.pop())
      }
      shuffle(newArr)
      acc.push(newArr)
      return acc
    }, [])
    return newPages
  } else if (visibleWrappers.length === 3) {
    let baseArr = pages.flat()
    let newPages = [...Array(16)].reduce((acc, cur, i) => {
      let newArr = []
      for (let i = 0; i < 3; i++) {
        newArr.push(baseArr.pop())
      }
      shuffle(newArr)
      acc.push(newArr)
      return acc
    }, [])
    return newPages
  }
}

const goToPage = (event) => {
  const currentPage = +PAGE_CONTROLS.children[2].textContent
  let lastPage = 48 / visibleWrappers.length 
  const btnTarget = event.target.classList
  const btnName = btnTarget[1]
  const numberPage = document.querySelector('.page-number')
  let modifiedNumber
  if (currentPage < lastPage && btnName === 'next-number') {
    modifiedNumber = currentPage + 1
    numberPage.textContent = `${modifiedNumber}`
    if (modifiedNumber === lastPage) {
      PAGE_CONTROLS.children[3].classList.add('disabled')
      PAGE_CONTROLS.children[4].classList.add('disabled')
    } 
    if (currentPage === 1) {
      PAGE_CONTROLS.children[0].classList.remove('disabled')
      PAGE_CONTROLS.children[1].classList.remove('disabled')
    }
    visibleWrappers.forEach((wrap, i) => {
        wrap.children[0].innerHTML = cardContent(pages[modifiedNumber - 1][i])
    })
  } else if (currentPage < lastPage && btnName === 'last-number') {
    numberPage.textContent = `${lastPage}`
    PAGE_CONTROLS.children[3].classList.add('disabled')
    PAGE_CONTROLS.children[4].classList.add('disabled')
    PAGE_CONTROLS.children[0].classList.remove('disabled')
    PAGE_CONTROLS.children[1].classList.remove('disabled')
    visibleWrappers.forEach((wrap, i) => {
        wrap.children[0].innerHTML = cardContent(pages[lastPage - 1][i])
    })
  } else if (currentPage > 1 && btnName === 'prev-number') {
    modifiedNumber = currentPage - 1
    numberPage.textContent = `${modifiedNumber}`
    if (modifiedNumber === 1) {
      PAGE_CONTROLS.children[0].classList.add('disabled')
      PAGE_CONTROLS.children[1].classList.add('disabled')
    }
    if (currentPage === lastPage) {
      PAGE_CONTROLS.children[3].classList.remove('disabled')
      PAGE_CONTROLS.children[4].classList.remove('disabled')
    } 
    visibleWrappers.forEach((wrap, i) => {
       wrap.children[0].innerHTML = cardContent(pages[modifiedNumber - 1][i])
    })
  } else if (currentPage > 1 && btnName === 'first-number') { 
    numberPage.textContent = `1`
    PAGE_CONTROLS.children[3].classList.remove('disabled')
    PAGE_CONTROLS.children[4].classList.remove('disabled')
    PAGE_CONTROLS.children[0].classList.add('disabled')
    PAGE_CONTROLS.children[1].classList.add('disabled')
    visibleWrappers.forEach((wrap, i) => {
        wrap.children[0].innerHTML = cardContent(pages[0][i])
    })
  }
}

export default function paginator() {
  if (PAGE_CONTROLS) {
    pages = pageContent();
    visibleWrappers.forEach((wrap, i) => {
        wrap.children[0].innerHTML = cardContent(pages[0][i])
    })
    PAGE_CONTROLS.addEventListener('click', goToPage);
  }  
}