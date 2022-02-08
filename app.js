// fetch('https://api.spoonacular.com/recipes/random?apiKey=0a0760ff66be4930825f532ce26fa3eb').then(resp => resp.json())
//         .then(recipies => 

const searchBtn = document.getElementById('search-btn');
const recipeList = document.getElementById('recipe--list');

// Event listeners
searchBtn.addEventListener('click', getMealList);
recipeList.addEventListener('click', getMealRecipe);
