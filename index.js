
//API endpoint url variable//

yummlyUrl = 'https://api.yummly.com/v1';



//genate unique URL for each course in different fetch functions//
const generateURL = (inputText, category) => {
  return `${yummlyUrl}/api/recipes?_app_id=${secret.id}&_app_key=${secret.key}&q=${inputText}&allowedCourse[]=course^course-${category}`;
}

//api call//
const ajaxCall = async url => {
  try {
    const res = await fetch(url);
    return await res.json();
  }
  catch (err) {
    return undefined;
  }
};

const callSearchInput = async inputText => {
  const result = await Promise.all([
    ajaxCall(generateURL(inputText, 'Beverages')),
    ajaxCall(generateURL(inputText, 'Appetizer')),
    ajaxCall(generateURL(inputText, 'Main Dishes')),
    ajaxCall(generateURL(inputText, 'Desserts')),
  ]);
  return await result;
};

searchForm.addEventListener('submit', async e => {
  e.preventDefault();

  mainArea.classList.remove('hide');
  downArrow.style.display = 'block';


  const result = await callSearchInput(searchWord.value);
  searchWord.value = '';

  result.map((value, index) => {
    if (index === 0) {
      renderRecipeHTML(value, drinkInfo);
      fetchRecipePicture(value.matches[0].id, drinkBlock, drinkInfo);

    }

    if (index === 1) {
      renderRecipeHTML(value, appInfo);
      fetchRecipePicture(value.matches[0].id, appBlock, appInfo);
    }

    if (index === 2) {
      renderRecipeHTML(value, entreeInfo);
      fetchRecipePicture(value.matches[0].id, entreeBlock, entreeInfo);
    }

    if (index === 3) {
      renderRecipeHTML(value, dessertInfo);
      fetchRecipePicture(value.matches[0].id, dessertBlock, dessertInfo);
    }
  });
});

// const callRecipeId = async (recipeId, div, linkDiv) => {
//   const result = await (ajaxCall(`${yummlyUrl}/api/recipe/${recipeId}?_app_id=${secret.id}&_app_key=${secret.key}`));
//   return await renderMore(`${result}`, div, linkDiv);
// };

// fetch big recipe picture //
function fetchRecipePicture(recipeId, content, linkContent) {
  return fetch(`${yummlyUrl}/api/recipe/${recipeId}?_app_id=${secret.id}&_app_key=${secret.key}`)
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
