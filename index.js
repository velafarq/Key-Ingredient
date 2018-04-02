const drinkBlock = document.getElementById('drink'),
appetizerBlock = document.getElementById('appetizer'),
entreeBlock = document.getElementById('entree'),
dessertBlock = document.getElementById('dessert'),
searchWord = document.getElementById('search-word'),
searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', getResults);

function getResults(e) {
  e.preventDefault();
  let inputText = searchWord.value;
  searchWord.value = '';
  
}
