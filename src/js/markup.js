import {
  favoritDrinks,
  favoriteIngredients,
  getNumberElement,
} from './initpage';
import { htmlElements } from './start';
import { observerForAmination, observerForLoad } from './initpage';
import { saveLocalStorage } from './localStorage';
import { KEY_LOCAL_STORAGE_FAVORITE_DRINKS } from './initpage';
import { KEY_LOCAL_STORAGE_FAVORITE_INGREDIENTS } from './initpage';
import { getCardsByIngridient, getCards } from './fetch';
import { onModalOpen } from './modal';

const modalBtnClose = document.querySelector('.modal__close-icon');
modalBtnClose.remove();
modalBtnClose.style.display = '';

export const btnIcon = document.querySelector('.btn__icon');
btnIcon.remove();
btnIcon.style.display = '';

export function createMarkUpCards(arrOfDrinks, param) {
  let htmlStrings = [];
  const h1 = document.querySelector('h1.section__title');
  if (arrOfDrinks.length === 0) {
    htmlElements.listOfDrinks.innerHTML = `<div class="card-error">
    <span class="card-error__text">Sorry, we didn't find any cocktail for you</span>
    <div class="card-error__img"></div></div>`;
    h1.innerHTML = '';
    if (document.querySelector('.btn.btn--more')) {
      document.querySelector('.btn.btn--more').remove();
    }
    return;
  } else {
    htmlStrings = arrOfDrinks.map(el => {
      let myClass = '';
      let myTextContent = '';
      if (el.idDrink in favoritDrinks) {
        myTextContent = 'Remove';
        myClass = 'btn-add  done';
      } else {
        myTextContent = 'Add to';
        myClass = 'btn-add';
      }
      let sringIng = '';
      for (let i = 1; i <= 15; i++) {
        if (el[`strIngredient${i}`] === null) break;
        if (el[`strMeasure${i}`] === null) {
          sringIng += `<li data-ingridient="${el[`strIngredient${i}`]}"> ${
            el[`strIngredient${i}`]
          }</li>`;
        } else {
          sringIng += `<li data-ingridient="${el[`strIngredient${i}`]}"> ${
            el[`strMeasure${i}`]
          } ${el[`strIngredient${i}`]}</li>`;
        }
      }
      // console.log('heart', btnIcon.outerHTML);
      return `<li class="card">
      <img class="card__img" src="${el.strDrinkThumb}"alt="${el.strDrink}" loading="lazy"/>
      <h3 class="card__title">${el.strDrink}</h3>
      <ul class=card__ingridients>${sringIng}</ul>
      <p class=card__instruction>${el.strInstructions}</p>
      <div class="card__buttons">
      <button class="btn btn--lm" type="button">Learn more</button>
      <button class="${myClass}" type="button" data-id="${el.idDrink}">${myTextContent} ${btnIcon.outerHTML}</button>
      </div></li>`;
    });
  }

  h1.innerHTML = param.h1Change ? param.h1Change : '';

  if (param.add) {
    htmlElements.listOfDrinks.insertAdjacentHTML(
      'beforeend',
      htmlStrings.join('')
    );

    if (document.querySelector('.btn.btn--more')) {
    } else {
      htmlElements.listOfDrinks.insertAdjacentHTML(
        'afterend',
        '<button type="button" class="btn btn--more">Load more</button>'
      );
      document
        .querySelector('.btn.btn--more')
        .addEventListener('click', e => getCards(getNumberElement()));
    }
    // observerForLoad.observe(document.querySelector('.card:last-child'));
  } else {
    htmlElements.listOfDrinks.innerHTML = htmlStrings.join('');
    if (document.querySelector('.btn.btn--more')) {
      document.querySelector('.btn.btn--more').remove();
    }
  }

  document
    .querySelectorAll('.card')
    .forEach(i => observerForAmination.observe(i));

  document.querySelectorAll('.btn-add').forEach(item => {
    item.addEventListener('click', newChooseDrink);
  });
  document.querySelectorAll('.btn.btn--lm').forEach(item => {
    item.addEventListener('click', showMoreAboutCoctail);
  });
  document.querySelectorAll('.card__ingridients li').forEach(item => {
    item.addEventListener('click', openIngridient);
  });
}

function newChooseDrink(e) {
  const element = e.currentTarget;
  const id = String(element.dataset.id);
  console.log('id in favoritDrinks', id, id in favoritDrinks);

  if (id in favoritDrinks) {
    delete favoritDrinks[id];
    element.innerHTML = `Add to ${btnIcon.outerHTML}`;
    element.className = 'btn-add';
  } else {
    favoritDrinks[id] = true;
    element.innerHTML = `Remove ${btnIcon.outerHTML}`;
    element.className = 'btn-add  done';
  }
  saveLocalStorage(KEY_LOCAL_STORAGE_FAVORITE_DRINKS, favoritDrinks);
  console.log('favoritDrinks', favoritDrinks);
}

function openIngridient(e) {
  console.log(e.currentTarget.dataset.ingridient);
  getCardsByIngridient(e.currentTarget.dataset.ingridient);
}
function showMoreAboutCoctail(e) {
  const modalWindow = document.querySelector('div.modal');
  modalWindow.innerHTML = `<button class="modal__close" type="button" data-modal-close>
                    ${modalBtnClose.outerHTML}
                  </button>`;
  modalWindow.insertAdjacentHTML(
    'beforeend',
    e.currentTarget.closest('.card').innerHTML
  );
  const btnAdd = modalWindow.querySelector('.btn-add');
  btnAdd.addEventListener('click', newChooseDrink);
  modalWindow.querySelectorAll('.card__ingridients li').forEach(item => {
    item.addEventListener('click', openIngridient);
  });

  if (btnAdd.textContent === 'Add to') btnAdd.textContent = 'Add to favorite';
  if (btnAdd.textContent === 'Remove')
    btnAdd.textContent = 'Remove from favorite';
  modalWindow
    .querySelector('.card__ingridients')
    .insertAdjacentHTML(
      'beforebegin',
      '<p class="ingridients__title">INGREDIENTS</p><p class="ingridients__mesure">Per cocktail</p>'
    );

  modalWindow
    .querySelector('.card__instruction')
    .insertAdjacentHTML(
      'beforebegin',
      '<p class="modal__title-Instructions">Instructions:</p>'
    );
  onModalOpen();
}
