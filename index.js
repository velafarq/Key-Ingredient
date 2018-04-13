
//API endpoint url variable//

yummlyUrl = 'https://api.yummly.com/v1';

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

const generateURL = (inputText, category) => {
  return `${yummlyUrl}/api/recipes?_app_id=${secret.id}&_app_key=${secret.key}&q=${inputText}&allowedCourse[]=course^course-${category}&requirePictures=true`
}

// fetch beverage information //

function fetchDrink(inputText) {
  fetch(generateURL(inputText, 'Beverages'))
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
  fetch(generateURL(inputText, 'Appetizers'))
.then(data => {
    console.log(data);
    fetchRecipePicture(data.matches[0].id, appPic, appLink);
    recipeInfo(data.matches[0].recipeName, 'app-button', appInfo);
    ingredientList(data.matches[0].ingredients, appIngredients);
  })
.catch(err => console.log(err));
}

// fetch entree information //

function fetchEntree(inputText) {
  fetch(generateURL(inputText, 'Main Dishes'))
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
  fetch(generateURL(inputText, 'Desserts'))
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
  fetch(`${yummlyUrl}/api/recipe/${recipeId}?_app_id=${secret.id}&_app_key=${secret.key}`)
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
}
