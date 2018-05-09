
//API endpoint url variable//

const BASE_URL = 'https://api.yummly.com/v1/api/recipes?_app_id=33ff0359&_app_key=c9dbab1cb989f66ccb3e9f085c6fe142';
//generate unique URL for each course in different fetch functions//
const generateURL = (inputText, category) => {
  return `${BASE_URL}&q=${inputText}&allowedCourse[]=course^course-${category}`;
};

// function getInfo(inputText, category) {
//   fetch(generateURL(inputText, category))
//   .then(res => res.json())
//   .then(data)
// }
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
  .catch(err => {
      console.log(err);
      drinkInfo.innerHTML =  `<p>Sorry, no beverages were found matching '${inputText}'. Please try another ingredient.</p>`;
      drinkBlock.innerHTML =  `<img src='https://images.pexels.com/photos/928854/pexels-photo-928854.jpeg?cs=srgb&dl=close-up-glass-h2o-928854.jpg&fm=jpg' class='main-image'>`;
    });
}

//  fetch appetizer information //

function fetchAppetizer(inputText) {
  fetch(generateURL(inputText, 'Appetizers'))
  .then(res => res.json())
  .then(data => {
    fetchRecipePicture(data.matches[0].id, appBlock, appInfo);
    renderRecipeHTML(data, appInfo);
  })
  .catch(err => {
    console.log(err);
    appInfo.innerHTML =  `<p>Sorry, no appetizers were found matching '${inputText}'. Please try another ingredient.</p>`;
    appBlock.innerHTML = `<img src='https://images.pexels.com/photos/957508/pexels-photo-957508.jpeg?cs=srgb&dl=baked-goods-bread-delicious-957508.jpg&fm=jpg' class='main-image'>`;
  });
}

// fetch entree information //

function fetchEntree(inputText) {
  fetch(generateURL(inputText, 'Main Dishes'))
  .then(res => res.json())
  .then(data => {
      fetchRecipePicture(data.matches[0].id, entreeBlock, entreeInfo);
      renderRecipeHTML(data, entreeInfo);
    })
  .catch(err => {
      console.log(err);
      entreeInfo.innerHTML =  `<p>Sorry, no main dishes were found matching '${inputText}'. Please try another ingredient.</p>`;
      entreeBlock.innerHTML = `<img src='https://images.pexels.com/photos/989690/pexels-photo-989690.jpeg?cs=srgb&dl=abstract-assortment-blur-989690.jpg&fm=jpg' class='main-image'>`;
    });
}

// fetch dessert information //
function fetchDessert(inputText) {
  fetch(generateURL(inputText, 'Desserts'))
  .then(res => res.json())
  .then(data => {
      fetchRecipePicture(data.matches[0].id, dessertBlock, dessertInfo);
      renderRecipeHTML(data, dessertInfo);
    })
  .catch(err => {
      console.log(err);
      dessertInfo.innerHTML =  `<p>Sorry, no desserts were found matching '${inputText}'. Please try another ingredient.</p>`;
      dessertBlock.innerHTML = `<img src='https://images.pexels.com/photos/372975/pexels-photo-372975.jpeg?cs=srgb&dl=berry-close-up-delicious-372975.jpg&fm=jpg' class='main-image'>`;
    });
}

// fetch big recipe picture and original recipe link//
function fetchRecipePicture(recipeId, content, linkContent) {
  return fetch(`https://api.yummly.com/v1/api/recipe/${recipeId}?_app_id=33ff0359&_app_key=c9dbab1cb989f66ccb3e9f085c6fe142`)
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
