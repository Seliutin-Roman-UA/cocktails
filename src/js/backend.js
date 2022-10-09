import axios from 'axios';

axios.defaults.baseURL = 'https://www.thecocktaildb.com/api/';

export default class FetchService {
  constructor() {
    this.searchQuery = '';
    this.letter = '';
    this.idCoctail = '';
    this.idIngridient = '';
    this.ings = {};
    
  }

  async randomCoctail() {
    const url = 'json/v1/1/random.php';   /*Один коктейль random*/
    const response = await axios.get(url);
    console.log(response.data.drinks[0]);
    return response.data.drinks[0];

  }
  randomCoctailOnStart() {
    const url = 'json/v1/1/random.php';   
    const response = axios.get(url);
    return response;
  }

  async byNameCoctail(number, query = this.searchQuery) {
        console.log('по имени');
        if(!query) {
          console.log('Enter searchQuery');
          return;
        }
        const url = `json/v1/1/search.php?s=${query.trim()}`;
        const response = await axios.get(url);
        console.log(response);
        const drinks = response.data.drinks;
        if (!drinks) {
          console.log("Sorry we didn't find any coctails");
          return;
        }
        if(number === 3 && drinks.length > 3) {
          console.log(drinks.slice(0,3));
          console.log('3 dinks');
          return drinks.slice(0,3);
        }
        if(number === 6 && drinks.length > 6) {
          console.log(drinks.slice(0,6));
          console.log('6 dinks');
          return drinks.slice(0,6);
        }
        if(number === 9 && drinks.length > 9) {
          console.log(drinks.slice(0,9));
          console.log('9 dinks');
          return drinks.slice(0,9);
        }
        console.log(drinks);
        return drinks;
  }

  async byLetterCoctail(number, query = this.letter) {
    console.log('по букве');
    if(!query) {
      console.log('Enter searchQuery');
      return;
    }
    const url = `json/v1/1/search.php?f=${query}`;
    const response = await axios.get(url);
    const drinks = response.data.drinks;
        if (!drinks) {
        console.log("Sorry we didn't find any coctails");
        return;
        }
        if(number === 3 && drinks.length > 3) {
          console.log(drinks.slice(0,3));
          console.log('3 dinks');
          return drinks.slice(0,3);
        }
        if(number === 6 && drinks.length > 6) {
          console.log(drinks.slice(0,6));
          console.log('6 dinks');
          return drinks.slice(0,6);
        }
        if(number === 9 && drinks.length > 9) {
          console.log(drinks.slice(0,9));
          console.log('9 dinks');
          return drinks.slice(0,9);
        }
        console.log(drinks);
        return drinks;
  }

  async byIdCoctail(id = this.idCoctail) {
    console.log('по ID');
    console.log('ID', id);
    const url = `json/v1/1/lookup.php?i=${id}`;
    const response = await axios.get(url);
    if(!response.data.drinks) {
      console.log("Sorry we didn't find any coctails");
      return;
    }
    console.log(response.data.drinks[0]);
    return response.data.drinks[0];
  }

  async byIdIngridient(id = this.idCoctail) {
    console.log('Ингридиенты по ID');
    const url = `json/v1/1/lookup.php?iid=${id}`;
    const response = await axios.get(url);
    if(!response.data.ingredients) {
      console.log("Sorry we didn't find any coctails");
      return;
    }
    console.log(response.data.ingredients[0]);
    return response.data.ingredients[0];
  }
  

  //Ingredients
  fetchIngredients(obj = this.ings) {  //получает объект drink {}
    const ingAr = [];
  for (let index = 1; index < 16; index+=1) {
    const el = obj[`strIngredient${index}`];
    if (!el) {
      break;
    }
    ingAr.push(el);
  }
  return ingAr; //массив ингридиентов
  }

}

// const fetchService = new FetchService();

// fetchService.byNameCoctail(9,'margarita');
// fetchService.byLetterCoctail(6,'m');

// document.body.insertAdjacentHTML('beforeend', '<button class="test-button">Test button</button>');
// document.body.insertAdjacentHTML('beforeend', '<div class="js-box"></div>');
// const testDiv = document.querySelector('.js-box');

// 9 random coctails

// async function onStart() {
//   const coctailsPr = [];
//   for (let index = 0; index < 9; index +=1) {
//     coctailsPr.push(fetchService.randomCoctailOnStart());
//   }
//   const coctails = await Promise.all(coctailsPr);
//   return coctails;
// }

// const testClick = document.querySelector('.test-button');
// testClick.addEventListener('click', onTestClick);

// async function onTestClick() {
//   const response = await onStart();
//   renderCoctailsAll(response);
//   testDiv.addEventListener('click', onLearnMore)
// }

// // Render markup 9 coctails

// function renderCoctailsAll(prm) {
//   const markup = prm
//     .map(
//       image =>
//         (image = `
//             <div class="thumb">            
//             <img src="${image.data.drinks[0].strDrinkThumb}" alt="" loading="lazy" width=320 heigth=320 />
//             </div>
//             <button type="button" class="js-learn-more" data-id="${image.data.drinks[0].idDrink}">Learn more</button>
//           `)
//     )
//     .join('');
//     testDiv.innerHTML = markup;
// }

// // Render markup 1 coctail

// function renderCoctail(prm) {
//   fetchService.ings = prm;
//   const ingredients = fetchService.fetchIngredients();
//     const markup = `
//               <div class="thumb">            
//               <img src="${prm.strDrinkThumb}" alt="" loading="lazy"  />
//               <p>Name: ${prm.strDrink}</p>
//               <p>Alcohol: ${prm.strAlcoholic}</p>
//               <p>Category: ${prm.strCategory}</p>
//               <p>Ingredients: ${ingredients.join(', ')}</p>
//               <p>Instructions: ${prm.strInstructions}</p>
//               </div>
//             `;
//             testDiv.insertAdjacentHTML('beforebegin', markup);
//   }

//   async function onLearnMore(evt) {
//     const response = await fetchService.byIdCoctail(evt.target.dataset.id);
//     renderCoctail(response);
      
//     }



// Работа c Localstorage

// async function saveMessage() {
// const byId = await fetchService.byIdCoctail('16311'); 
// localStorage.setItem('COCTAIL', JSON.stringify(byId));
// }
// saveMessage();

// function loadMessage() {
//   const load =JSON.parse(localStorage.getItem('COCTAIL'));
// console.log('favorite',load);
// }
// loadMessage();