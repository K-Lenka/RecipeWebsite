const searchBtn = document.getElementById('search-btn');
const recipeList = document.getElementById('recipe--list');

// Event listeners
searchBtn.addEventListener('click', getMealList);

// get food list 
function getMealList(){
    let searchInput = document.getElementById('search-input')

    searchInput.value.trim()

    fetch(`https://api.spoonacular.com/recipes/random?apiKey=0a0760ff66be4930825f532ce26fa3eb`)
    .then(response => response.json())
    .then(data => console.log(data))
    
}
