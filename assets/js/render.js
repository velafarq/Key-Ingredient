
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

  footer.classList.add('footer-style');
  footer.innerHTML = valueObj.attribution.html;
}

function recipeLink(link, linkDiv) {
  let output = `<a href='${link}' target='_blank' class='view-recipe'><i class="fas fa-book"></i>&nbsp;View recipe</a>`;
  linkDiv.insertAdjacentHTML('beforeend', output);
}
