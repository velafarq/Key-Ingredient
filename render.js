//drink//

fetchRecipePicture(data.matches[0].id, bevPic, drinkLink);
recipeInfo(data.matches[0].recipeName, 'drink-button', drinkInfo);
ingredientList(data.matches[0].ingredients, drinkIngredients);

//appetizer//
fetchRecipePicture(data.matches[0].id, appPic, appLink);
recipeInfo(data.matches[0].recipeName, 'app-button', appInfo);
ingredientList(data.matches[0].ingredients, appIngredients);

//main//

fetchRecipePicture(data.matches[0].id, entreePic, entreeLink);
recipeInfo(data.matches[0].recipeName, 'entree-button', entreeInfo);
ingredientList(data.matches[0].ingredients, entreeIngredients);

//dessert//
fetchRecipePicture(data.matches[0].id, dessertPic, dessertLink);
recipeInfo(data.matches[0].recipeName, 'dessert-button', dessertInfo);
ingredientList(data.matches[0].ingredients, dessertIngredients);
