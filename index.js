

//variables to access DOM//
const searchWord = document.getElementById('search-word'),
searchForm = document.getElementById('search-form'),
mainArea = document.getElementById('main'),
viewIngredients = document.getElementById('view-ingredients'),

//drink//
drinkBlock = document.getElementById('drink'),
drinkInfo = document.getElementById('drink-info'),
drinkIngredients = document.getElementById('drink-ingredients'),
drinkLink = document.getElementById('drink-link'),
viewDrink = document.getElementById('view-drink'),
bevPic = document.getElementById('bev-pic'),

//appetizer//
appetizerBlock = document.getElementById('appetizer'),
appInfo = document.getElementById('app-info'),
appIngredients = document.getElementById('app-ingredients'),
appLink = document.getElementById('app-link'),
viewApp = document.getElementById('view-app'),
appPic = document.getElementById('app-pic'),

//entree//
entreeBlock = document.getElementById('entree'),
entreeInfo = document.getElementById('entree-info'),
entreeIngredients = document.getElementById('entree-ingredients'),
entreeLink = document.getElementById('entree-link'),
viewEnt = document.getElementById('view-ent'),
entreePic = document.getElementById('entree-pic'),

//dessert//
dessertBlock = document.getElementById('dessert'),
dessertInfo = document.getElementById('dessert-info'),
dessertIngredients = document.getElementById('dessert-ingredients'),
dessertLink = document.getElementById('dessert-link'),
viewDess = document.getElementById('view-dess'),
dessertPic = document.getElementById('dessert-pic'),

//API endpoint url variables//

yummlyUrl = 'https://api.yummly.com/v1',
edamamUrl = 'https://api.edamam.com/search'; //?q=${inputText}&app_id=fddbf388&app_key=87b9baad36b2f49560c619843a13a7c0';

// basic templates for each course //

function recipeInfo(heading, content, id) {
  let output = '';
  output += `
  <div>
  <h3>${heading}<h3>
  <button onclick='displayIngredients()' id='view-ingredients'>View ingredients</button></div>`;
  content.innerHTML = output;
}

function ingredientList(ingredients, content) {
  content.innerHTML = ingredients.map(x => `<li>${x}</li>`);
}

function recipeLink(link, content) {
  let output = `<a href='${link}' target='_blank'>
    Take me to the recipe</a>`;
  content.innerHTML = output;
}

//end course templates//


// fetch beverage information //

function fetchDrink(inputText) {
  fetch(`${yummlyUrl}/api/recipes?_app_id=33ff0359&_app_key=c9dbab1cb989f66ccb3e9f085c6fe142&q=${inputText}&allowedCourse[]=course^course-Beverages&requirePictures=true`)
  .then(res => res.json())
  .then(data => {
      fetchRecipePicture(data.matches[0].id, bevPic);
      recipeInfo(data.matches[0].recipeName, drinkInfo,);
      ingredientList(data.matches[0].ingredients, drinkIngredients);
      recipeLink(`https://www.yummly.com/recipe/${data.matches[0].id}`, drinkLink);
    })

  .catch(err => console.log(err));
}

//  fetch appetizer information //

function fetchAppetizer(inputText) {
  fetch(`${yummlyUrl}/api/recipes?_app_id=33ff0359&_app_key=c9dbab1cb989f66ccb3e9f085c6fe142&q=${inputText}&allowedCourse[]=course^course-Appetizers&requirePictures=true`)
.then(res => res.json())
.then(data => {
    fetchRecipePicture(data.matches[0].id, appPic);
    recipeInfo(data.matches[0].recipeName, appInfo);
    ingredientList(data.matches[0].ingredients, appIngredients);
    recipeLink(`https://www.yummly.com/recipe/${data.matches[0].id}`, appLink);
  })
.catch(err => console.log(err));
}

// fetch entree information //

function fetchEntree(inputText) {
  fetch(`${yummlyUrl}/api/recipes?_app_id=33ff0359&_app_key=c9dbab1cb989f66ccb3e9f085c6fe142&q=${inputText}&allowedCourse[]=course^course-Main Dishes&requirePictures=true`)
  .then(res => res.json())
  .then(data => {
      fetchRecipePicture(data.matches[0].id, entreePic);
      recipeInfo(data.matches[0].recipeName, entreeInfo);
      ingredientList(data.matches[0].ingredients, entreeIngredients);
      recipeLink(`https://www.yummly.com/recipe/${data.matches[0].id}`, entreeLink);
    })
  .catch(err => console.log(err));
}

// fetch dessert information //
function fetchDessert(inputText) {
  fetch(`${yummlyUrl}/api/recipes?_app_id=33ff0359&_app_key=c9dbab1cb989f66ccb3e9f085c6fe142&q=${inputText}&allowedCourse[]=course^course-Desserts&requirePictures=true`)
  .then(res => res.json())
  .then(data => {
      fetchRecipePicture(data.matches[0].id, dessertPic);
      recipeInfo(data.matches[0].recipeName, dessertInfo);
      ingredientList(data.matches[0].ingredients, dessertIngredients);
      recipeLink(`https://www.yummly.com/recipe/${data.matches[0].id}`, dessertLink);
    })
  .catch(err => console.log(err));
}

function fetchRecipePicture(recipeId, content) {
  fetch(`${yummlyUrl}/api/recipe/${recipeId}?_app_id=33ff0359&_app_key=c9dbab1cb989f66ccb3e9f085c6fe142`)
  .then(res => res.json())
  .then(data => {
    console.log(data);

    const id = data.images[0].imageUrlsBySize['360'];
    let output = '';
    output += `<img src=${id}>`;
    content.innerHTML = output;
  })
  .catch(err => console.log(err));
}

//  run everything on form submission//
searchForm.addEventListener('submit', getResults);

function getResults(e) {
  e.preventDefault();

  let inputText = searchWord.value;

  fetchDrink(inputText);
  fetchAppetizer(inputText);
  fetchEntree(inputText);
  fetchDessert(inputText);
}

function displayIngredients() {
  viewDrink.classList.toggle('show');
  console.log('this ran');
}

// function displayIngredients() {
//   viewDrink.classList.toggle('show');
// }
