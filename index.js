
//API endpoint url variable//

yummlyUrl = 'https://api.yummly.com/v1';



//genate unique URL for each course in different fetch functions//
const generateURL = (inputText, category) => {
  return `${yummlyUrl}/api/recipes?_app_id=${secret.id}&_app_key=${secret.key}&q=${inputText}&allowedCourse[]=course^course-${category}`;
}

// fetch beverage information //

const drink = function fetchDrink(inputText) {
  fetch(generateURL(inputText, 'Beverages'))
  .then(res => res.json())
  .then(data => {
      return data;
    })

  .catch(err => console.log(err));
};

//  fetch appetizer information //

const appetizer = function fetchAppetizer(inputText) {
  fetch(generateURL(inputText, 'Appetizer'))
  .then(res => res.json())
  .then(data => {
    return data;
  })
.catch(err => console.log(err));
};

// fetch entree information //

const entree = function fetchEntree(inputText) {
  fetch(generateURL(inputText, 'Main Dishes'))
  .then(res => res.json())
  .then(data => {
      return data;
    })
  .catch(err => console.log(err));
};

// fetch dessert information //
const dessert = function fetchDessert(inputText) {
  fetch(generateURL(inputText, 'Desserts'))
  .then(res => res.json())
  .then(data => {
      return data;

    })
  .catch(err => console.log(err));
};

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
    drink, appetizer, entree, dessert,
  ])
  .then((resultsArr)=> {
    console.log(resultsArr[0]);
  });
}
