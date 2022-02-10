// const ApiKey = "0a0760ff66be4930825f532ce26fa3eb";
const ApiKey = "a8e6be38c9af4d17bb5e9d1af913a291";
const numOfRecipe = 5;

function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim(); 
  template.innerHTML = html;
  return template.content.firstChild;
}

// get food list
async function getRecipies(offset = 0) {
  const input = document.getElementById("search-input").value.trim();
  const pagination = document.getElementById('pagination');
  const recipeList = document.getElementById("recipe-list");

  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${ApiKey}&query=${input}&number=${numOfRecipe}&offset=${offset}`
  );
  const data = await response.json();

  let html = "";

  let totalPages = Math.floor(data.totalResults / numOfRecipe);
  
  // Create recipe list
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
}
