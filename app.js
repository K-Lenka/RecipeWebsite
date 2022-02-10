const searchBtn = document.getElementById('search-btn');
const recipeList = document.getElementById('recipe-list');
const searchInput = document.getElementById('search-input');

// Event listener
searchBtn.addEventListener('click', getMealList);

searchInput.addEventListener('keyup', function(e){
    if(e.key === 'Enter'){
       getMealList();
    }
});

// get food list
function getMealList() {
  let input = searchInput.value.trim();

  fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=0a0760ff66be4930825f532ce26fa3eb&query=${input}&number=5&offset=0`
  )
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
      let html = "";
      if (data.results) {
        data.results.forEach((result) => {
          html += ` <div class = "meal-item" data-id = "${result.id}">
                <div class = "meal-img">
                    <img src = "${result.image}" alt="food">
                </div>
                <div class = "meal-name">
                    <h3>${result.title}</h3>
                    <a href = "#" class = "recipe-btn">Get Recipe</a>
                </div>
            </div>`;
        });
      }
      recipeList.innerHTML = html;
    });
}

// get recipe

function getMealRecipe(e){
  e.preventDefault();
  if(e.target.classList.contains('recipe-btn')){
      let mealItem = e.target.parentElement.parentElement;
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
      .then(response => response.json())
      .then(data => mealRecipeModal(data.meals));
  }
}
