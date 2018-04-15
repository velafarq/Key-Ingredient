
//API endpoint url variable//

yummlyUrl = 'https://api.yummly.com/v1';

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

//genate unique URL for each course in different fetch functions//
const generateURL = (inputText, category) => {
  return `${yummlyUrl}/api/recipes?_app_id=${secret.id}&_app_key=${secret.key}&q=${inputText}&allowedCourse[]=course^course-${category}`;
}

// fetch beverage information //

function fetchDrink(inputText) {
  fetch(generateURL(inputText, 'Beverages'))
  .then(res => res.json())
  .then(data => {
      return data;
    })

  .catch(err => console.log(err));
}

//  fetch appetizer information //

function fetchAppetizer(inputText) {
  fetch(generateURL(inputText, 'Side Dishes'))
.then(data => {
    return data;
  })
.catch(err => console.log(err));
}

// fetch entree information //

function fetchEntree(inputText) {
  fetch(generateURL(inputText, 'Main Dishes'))
  .then(res => res.json())
  .then(data => {
      return data;
    })
  .catch(err => console.log(err));
}

// fetch dessert information //
function fetchDessert(inputText) {
  fetch(generateURL(inputText, 'Desserts'))
  .then(res => res.json())
  .then(data => {
      return data;
    })
  .catch(err => console.log(err));
}

// fetch big recipe picture //
function fetchRecipePicture(recipeId, content, linkContent) {
  fetch(`${yummlyUrl}/api/recipe/${recipeId}?_app_id=${secret.id}&_app_key=${secret.key}`)
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

//  run everything on form submission//
searchForm.addEventListener('submit', getResults);

function getResults(e) {
  e.preventDefault();

  mainArea.style.display = 'flex';

  let inputText = searchWord.value;
  searchForm.reset();

  const bigData = Promise.all([
    fetchDrink(inputText),
    // fetchAppetizer(inputText),
    fetchEntree(inputText),
    fetchDessert(inputText),
  ]);

  console.log(bigData);

}
