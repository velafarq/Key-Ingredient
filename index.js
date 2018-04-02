//variables to access DOM//

const drinkBlock = document.getElementById('drink'),
appetizerBlock = document.getElementById('appetizer'),
entreeBlock = document.getElementById('entree'),
dessertBlock = document.getElementById('dessert'),
searchWord = document.getElementById('search-word'),
searchForm = document.getElementById('search-form'),

//API endpoint url variables//

yummlyUrl = 'https://api.yummly.com/v1',
edamamUrl = 'https://api.edamam.com/search';

searchForm.addEventListener('submit', getResults);

function getResults(e) {
  e.preventDefault();
  let inputText = searchWord.value;
  searchWord.value = '';

  fetchDrink(inputText);
}

function fetchDrink(inputText) {
  fetch(`${yummlyUrl}/api/recipes?_app_id=33ff0359&_app_key=c9dbab1cb989f66ccb3e9f085c6fe142&
  q=${inputText}&requirePictures=true`)
  .then(res => res.json())
  .then(data => {
    let output = '';
    output += `
    <img src='${data.matches[0].imageUrlsBySize[0]}'>
    <h3>${data.matches[0].recipeName}<h3>
    <h4>Ingredients</h4>
    <p>${data.matches[0].ingredients}`;
  });
  drinkBlock.innerHTML = output;
}
