
// basic templates for each course //

function recipeInfo(heading, content) {
  let output = '';
  output += `
  <div class='recipe-title'>
  <h3>${heading}<h3>
  </div>`;
  content.innerHTML = output;
}

function ingredientList(ingredients, content) {
  let output = '';
  output = ingredients.map(x => `<li><i class="far fa-star"></i> ${x}</li>`).join(',').replace(/,/g, '');
  content.innerHTML = output;
}

function recipeLink(link, content) {
  let output = `<a href='${link}' target='_blank'>
    View recipe</a>`;
  content.innerHTML = output;
}

//end course templates//
