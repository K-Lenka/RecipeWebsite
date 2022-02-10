const searchBtn = document.getElementById("search-btn");
const recipeList = document.getElementById("recipe-list");
const searchInput = document.getElementById("search-input");

// Event listener
searchBtn.addEventListener("click", getMealList);

searchInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    getMealList();
  }
});

// get food list
function getMealList() {
  let input = searchInput.value.trim();
  const ApiKey = "0a0760ff66be4930825f532ce26fa3eb";
  let numOfRecipe = 5;
  let offsetNum = 0;

  fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${ApiKey}&query=${input}&number=${numOfRecipe}&offset=${offsetNum}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let html = "";
      if (data.results.length !== 0) {
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
        recipeList.classList.remove("notFound");
      } else {

        html = "Sorry, we didn't find any meal!";
        recipeList.classList.add("notFound");
      }
      recipeList.innerHTML = html;
    });
}
