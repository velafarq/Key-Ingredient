
//API endpoint url variable//

const BASE_URL = 'https://api.yummly.com/v1/api/recipes?_app_id=33ff0359&_app_key=c9dbab1cb989f66ccb3e9f085c6fe142';

const $main = $('#main');
const $searchForm = $('#search-form');

const generateURL = (inputText, category) => {
  return `${BASE_URL}&q=${inputText}&allowedCourse[]=course^course-${category}`;
};

function render(data) {

  fetch(`https://api.yummly.com/v1/api/recipe/${data.matches[0].id}?_app_id=33ff0359&_app_key=c9dbab1cb989f66ccb3e9f085c6fe142`)
    .then(res => res.json())
    .then(recipe => {
      console.log(recipe);
    let ingredientList = recipe.ingredientLines
    .map(x => `<li>${x}</li>`).join(',').replace(/,/g, '');

    $main.append(`
           <section role='region' class='recipe-block'>
              <h2>${data.matches[0].attributes.course[0]}</h2>
              <img src=${recipe.images[0].imageUrlsBySize['360']} class='main-image' alt='${recipe.name}'>
              <div class='recipe-info'>
              <h3 class='title'>${recipe.name}<h3>
              <ul>${ingredientList}</ul>
              <a href='${recipe.source.sourceRecipeUrl}' target='_blank' class='view-recipe'>
              <i class="fas fa-book"></i>&nbsp;View recipe</a></div>
            </section>`);

  $('#footer').html(`<div class='footer-style'>${data.attribution.html}</section>`);
          })
    .catch(error);
}

function error(error) {
  $main
  .append(`
    <section role='region' class='recipe-block'><img src='./assets/images/Glass-of-water.jpg' class='main-image'>
    <p>Sorry, no results were found matching your keyword. Please try another ingredient.</p></section>`);
}

function getData(url) {
  fetch(url)
  .then(res => res.json())
  .then(render)
  .catch(error);
}

function getResults(e) {
  e.preventDefault();
  let searchInput = $(this).find('input').val();
  $searchForm[0].reset();
  $main.empty();

  $('#down-arrow').css('display', 'block');

  getData(generateURL(searchInput, 'Beverages'));
  getData(generateURL(searchInput, 'Appetizers'));
  getData(generateURL(searchInput, 'Main Dishes'));
  getData(generateURL(searchInput, 'Desserts'));
}

$searchForm.submit(getResults);
