
//API endpoint url variable//

yummlyUrl = 'https://api.yummly.com/v1';

//generate unique URL for each course in different fetch functions//
const generateURL = (inputText, category) => {
  return `${yummlyUrl}/api/recipes?_app_id=33ff0359&_app_key=c9dbab1cb989f66ccb3e9f085c6fe142&q=${inputText}&allowedCourse[]=course^course-${category}`;
};

// fetch beverage information //

function fetchDrink(inputText) {
  //using generateURL, create a unique URL for beverages//
  fetch(generateURL(inputText, 'Beverages'))
  .then(res => res.json())
  .then(data => {
      //apply this data to these two functions//
      fetchRecipePicture(data.matches[0].id, drinkBlock, drinkInfo);
      renderRecipeHTML(data, drinkInfo);
    })
  .catch(err => console.log(err));
}

//  fetch appetizer information //

function fetchAppetizer(inputText) {
  fetch(generateURL(inputText, 'Appetizers'))
  .then(res => res.json())
  .then(data => {
    fetchRecipePicture(data.matches[0].id, appBlock, appInfo);
    renderRecipeHTML(data, appInfo);
  })
.catch(err => console.log(err));
}

// fetch entree information //

function fetchEntree(inputText) {
  fetch(generateURL(inputText, 'Main Dishes'))
  .then(res => res.json())
  .then(data => {
      fetchRecipePicture(data.matches[0].id, entreeBlock, entreeInfo);
      renderRecipeHTML(data, entreeInfo);
    })
  .catch(err => console.log(err));
}

// fetch dessert information //
function fetchDessert(inputText) {
  fetch(generateURL(inputText, 'Desserts'))
  .then(res => res.json())
  .then(data => {
      fetchRecipePicture(data.matches[0].id, dessertBlock, dessertInfo);
      renderRecipeHTML(data, dessertInfo);
    })
  .catch(err => console.log(err));
}

// fetch big recipe picture and original recipe link//
function fetchRecipePicture(recipeId, content, linkContent) {
  return fetch(`${yummlyUrl}/api/recipe/${recipeId}?_app_id=33ff0359&_app_key=c9dbab1cb989f66ccb3e9f085c6fe142`)
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

//event listener that takes input text and applies it to all the functions//
searchForm.addEventListener('submit', getResults);

//function that runs everything upon submission of the form//
function getResults(e) {
  e.preventDefault();

  //removing the class that hides the mains section that will contain all the results//
  mainArea.classList.remove('hide');

  // display the arrow that shows the user that there is new content below
  // this arrow can also be clicked
  downArrow.style.display = 'block';

  //accessing the search word that the user typed in the search box
  let inputText = searchWord.value;
  searchForm.reset();

  //applying the search word to all the functions
  fetchDrink(inputText);
  fetchAppetizer(inputText);
  fetchEntree(inputText);
  fetchDessert(inputText);
}
