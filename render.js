

//drink//

fetchRecipePicture(bigData.drink.matches[0].id, bevPic, drinkLink);
recipeInfo(bigData.drink.matches[0].recipeName, 'drink-button', drinkInfo);
ingredientList(bigData.drink.matches[0].ingredients, drinkIngredients);

//appetizer//
fetchRecipePicture(bigData.appetizer.matches[0].id, appPic, appLink);
recipeInfo(bigData.appetizer.matches[0].recipeName, 'app-button', appInfo);
ingredientList(bigData.appetizer.matches[0].ingredients, appIngredients);

//main//

fetchRecipePicture(bigData.entree.matches[0].id, entreePic, entreeLink);
recipeInfo(bigData.entree.matches[0].recipeName, 'entree-button', entreeInfo);
ingredientList(bigData.entree.matches[0].ingredients, entreeIngredients);

//dessert//
fetchRecipePicture(bigData.dessert.matches[0].id, dessertPic, dessertLink);
recipeInfo(bigData.dessert.matches[0].recipeName, 'dessert-button', dessertInfo);
ingredientList(bigData.dessert.matches[0].ingredients, dessertIngredients);


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
