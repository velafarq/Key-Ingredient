
//API endpoint url variable//

yummlyUrl = 'https://api.yummly.com/v1';



//genate unique URL for each course in different fetch functions//
const generateURL = (inputText, category) => {
  return `${yummlyUrl}/api/recipes?_app_id=${secret.id}&_app_key=${secret.key}&q=${inputText}&allowedCourse[]=course^course-${category}`;
}

// fetch beverage information //
function fetchDrink(inputText) {
  return fetch(generateURL(inputText, 'Beverages'))
  .then(res => res.json())
  .then(data => {
      fetchRecipePicture(data.matches[0].id, bevPic, drinkLink);
      recipeInfo(data.matches[0].recipeName, drinkInfo);
      ingredientList(data.matches[0].ingredients, drinkIngredients);
    })

  .catch(err => console.log(err));
};

//  fetch appetizer information //

function fetchAppetizer(inputText) {
  return fetch(generateURL(inputText, 'Appetizer'))
  .then(res => res.json())
  .then(data => {
    fetchRecipePicture(data.matches[0].id, appPic, appLink);
    recipeInfo(data.matches[0].recipeName, appInfo);
    ingredientList(data.matches[0].ingredients, appIngredients);

  })
.catch(err => console.log(err));
};

// fetch entree information //

function fetchEntree(inputText) {
return fetch(generateURL(inputText, 'Main Dishes'))
  .then(res => res.json())
  .then(data => {
      fetchRecipePicture(data.matches[0].id, entreePic, entreeLink);
      recipeInfo(data.matches[0].recipeName, entreeInfo);
      ingredientList(data.matches[0].ingredients, entreeIngredients);

    })
  .catch(err => console.log(err));
};

// fetch dessert information //
function fetchDessert(inputText) {
  return fetch(generateURL(inputText, 'Desserts'))
  .then(res => res.json())
  .then(data => {
      fetchRecipePicture(data.matches[0].id, dessertPic, dessertLink);
      recipeInfo(data.matches[0].recipeName, dessertInfo);
      ingredientList(data.matches[0].ingredients, dessertIngredients);

    })
  .catch(err => console.log(err));
};

// fetch big recipe picture //
function fetchRecipePicture(recipeId, content, linkContent) {
  return fetch(`${yummlyUrl}/api/recipe/${recipeId}?_app_id=${secret.id}&_app_key=${secret.key}`)
  .then(res => res.json())
  .then(data => {
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

  Promise.all([
    fetchDrink(inputText),
  fetchAppetizer(inputText),
  fetchEntree(inputText),
  fetchDessert(inputText),
]);
}
