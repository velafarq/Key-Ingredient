
// basic templates for each course //

function renderRecipeHTML(valueObj, div) {
  let output = '';
  let ingredientList = valueObj.matches[0].ingredients.map(x => `<li>${x}</li>`).join(',').replace(/,/g, '');

  output += `
  <div class='recipe-info'>
  <h3 class='title'>${valueObj.matches[0].recipeName}<h3>
  <ul>${ingredientList}</ul>
  </div>`;
  div.innerHTML = output;
}

// // end course templates//
// function renderMore(valueObj, div, linkDiv) {
//
//   const id = valueObj.images[0].imageUrlsBySize['360'];
//   let output = '';
//   output += `<img src=${id} class='main-image'>`;
//   div.innerHTML = output;
//
//   //also using this api to fetch the direct link to the recipe, instead of going through yummly//
//   recipeLink(valueObj.source.sourceRecipeUrl, linkDiv);
// }

function recipeLink(link, linkDiv) {
  let output = `<a href='${link}' target='_blank' class='view-recipe'><i class="fas fa-book"></i>&nbsp;View recipe</a>`;
  linkDiv.insertAdjacentHTML('beforeend', output);
}
