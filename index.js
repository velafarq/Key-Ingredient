
//API endpoint url variables//

yummlyUrl = 'https://api.yummly.com/v1',
edamamUrl = 'https://api.edamam.com/search'; //?q=${inputText}&app_id=fddbf388&app_key=87b9baad36b2f49560c619843a13a7c0';

// basic templates for each course //

function recipeInfo(heading, id, content) {
  let output = '';
  output += `
  <div class='recipe-title'>
  <h3>${heading}<h3>
  </div>
  <button id='${id}')'>Show ingredients</button></div>`;
  content.innerHTML = output;
}

function ingredientList(ingredients, content) {
  let output = '';
  output = ingredients.map(x => `<li>${x}</li>`).join(',').replace(/,/g, '');
  content.innerHTML = output;
}

function recipeLink(link, content) {
  let output = `<a href='${link}' target='_blank'>
    View recipe</a>`;
  content.innerHTML = output;
}

//end course templates//

// fetch beverage information //

function fetchDrink(inputText) {
  fetch(`${yummlyUrl}/api/recipes?_app_id=33ff0359&_app_key=c9dbab1cb989f66ccb3e9f085c6fe142&q=${inputText}&allowedCourse[]=course^course-Beverages&requirePictures=true`)
  .then(res => res.json())
  .then(data => {
      fetchRecipePicture(data.matches[0].id, bevPic, drinkLink);
      recipeInfo(data.matches[0].recipeName, 'drink-button', drinkInfo);
      ingredientList(data.matches[0].ingredients, drinkIngredients);

    })

  .catch(err => console.log(err));
}

//  fetch appetizer information //

function fetchAppetizer(inputText) {
  fetch(`${yummlyUrl}/api/recipes?_app_id=33ff0359&_app_key=c9dbab1cb989f66ccb3e9f085c6fe142&q=${inputText}&allowedCourse[]=course^course-Appetizers&requirePictures=true`)
.then(res => res.json())
.then(data => {
    fetchRecipePicture(data.matches[0].id, appPic, appLink);
    recipeInfo(data.matches[0].recipeName, 'app-button', appInfo);
    ingredientList(data.matches[0].ingredients, appIngredients);
  })
.catch(err => console.log(err));
}

// fetch entree information //

function fetchEntree(inputText) {
  fetch(`${yummlyUrl}/api/recipes?_app_id=33ff0359&_app_key=c9dbab1cb989f66ccb3e9f085c6fe142&q=${inputText}&allowedCourse[]=course^course-Main Dishes&requirePictures=true`)
  .then(res => res.json())
  .then(data => {
      fetchRecipePicture(data.matches[0].id, entreePic, entreeLink);
      recipeInfo(data.matches[0].recipeName, 'entree-button', entreeInfo);
      ingredientList(data.matches[0].ingredients, entreeIngredients);

    })
  .catch(err => console.log(err));
}

// fetch dessert information //
function fetchDessert(inputText) {
  fetch(`${yummlyUrl}/api/recipes?_app_id=33ff0359&_app_key=c9dbab1cb989f66ccb3e9f085c6fe142&q=${inputText}&allowedCourse[]=course^course-Desserts&requirePictures=true`)
  .then(res => res.json())
  .then(data => {
      fetchRecipePicture(data.matches[0].id, dessertPic, dessertLink);
      recipeInfo(data.matches[0].recipeName, 'dessert-button', dessertInfo);
      ingredientList(data.matches[0].ingredients, dessertIngredients);
    })
  .catch(err => console.log(err));
}

// fetch big recipe picture //
function fetchRecipePicture(recipeId, content, linkContent) {
  fetch(`${yummlyUrl}/api/recipe/${recipeId}?_app_id=33ff0359&_app_key=c9dbab1cb989f66ccb3e9f085c6fe142`)
  .then(res => res.json())
  .then(data => {
    console.log(data);

    const id = data.images[0].imageUrlsBySize['360'];
    let output = '';
    output += `<img src=${id} class='main-image'>`;
    content.innerHTML = output;

    //also using this api to fetch the direct link to the recipe, instead of going through yummly//
    recipeLink(data.source.sourceRecipeUrl, linkContent);

  })
  .catch(err => console.log(err));
}

//  run everything on form submission//
searchForm.addEventListener('submit', getResults);

function getResults(e) {
  e.preventDefault();

  mainArea.style.display = 'flex';

  let inputText = searchWord.value;
  searchForm.reset();
  fetchDrink(inputText);
  fetchAppetizer(inputText);
  fetchEntree(inputText);
  fetchDessert(inputText);
  fetchPairingInfo();
}

// function displayIngredients() {
//   viewDrink.classList.toggle('show');
// }


function fetchPairingInfo() {
  fetch('https://api.foodpairing.com/ingredients/4243/pairings?q=tahini', {
    headers: {
      'x-application-id': 'dd34d7be',
      'x-application-key': '7cb083d0ade11881caf75d5cd7bb256c',
      Accept: 'application/json',
    },
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));

}
