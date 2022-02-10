// const ApiKey = "0a0760ff66be4930825f532ce26fa3eb";
const ApiKey = "a8e6be38c9af4d17bb5e9d1af913a291";
const numOfRecipe = 5;

function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim(); 
  template.innerHTML = html;
  return template.content.firstChild;
}

const buildSearchPage = () => {
  const content = document.getElementById("content");

  const searchDiv = htmlToElement(`
  <div class="recipe-search">
    <h2 class="title">Find A Recipe By Ingredients</h2>
    <div class="recipe-search-container">
      <input type="text" class="search-control" placeholder="Enter an ingredient" id="search-input">
      <button type="submit" class="search-btn btn" id="search-btn">
         <i class = "fas fa-search"></i>
      </button>
    </div>
  </div>
  `);

  const searcResult = htmlToElement(`
  <div id="recipe-result">
      <h2 class="title"> Your Search Results:</h2>
      <div id="recipe-list">

      </div>
  </div>
  `);

  const navigation = htmlToElement(`
  <nav class="d-flex justify-content-center nav-pagination" aria-label="Page navigation example ">
  <ul class="pagination" id="pagination">
      <li class="page-item arrows">
          <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
          </a>
      </li>
       <li class="page-item arrows">
          <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
          </a>
      </li>
  </ul>
  </nav>
  `);

  content.append(searchDiv,searcResult,navigation);

  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("search-input");

  searchBtn.addEventListener("click", () => getRecipies());

  searchInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      getRecipies();
    }
  });
};

  buildSearchPage();

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

  // Create page number
  const AddPages = function (pageNumber) {

    const newLi = htmlToElement(`
    <li class="page-item"><a class="page-link" href="#">${pageNumber + 1}</a></li>
    `)

    pagination.append(newLi);

    newLi.addEventListener("click", () =>
      getRecipies(pageNumber * numOfRecipe)
    );

    return pagination;
  };

  pagination.innerHTML = "";

  for (let i = 0; i < totalPages; i++) {
    AddPages(i);
  }
  
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
