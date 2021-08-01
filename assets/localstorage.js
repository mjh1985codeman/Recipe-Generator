//Global Variables
var apiKey = "apiKey=6e8a92552104438f980149e4f5829086";
var apiKey2 = "apiKey=c3283e8f374c4709a08d9c074a13d89f";
var clearHistoryBtnEl = document.getElementById("clear-history-btn");

//Event Listener for clear history button.
clearHistoryBtnEl.addEventListener("click", clearHistory);

//function to get the recipes in local storage and load them to the page.
function getLocalStorage() {
  //got the items from local storage and stored them in local variable loadedRecipes
  var loadedRecipes = JSON.parse(localStorage.getItem("saved-recipes"));
  console.log(loadedRecipes);
  //if statement to set loadedRecipes as an empty array if nothing is there.
  if (!loadedRecipes) {
    loadedRecipes = [];
  }
  console.log(loadedRecipes.length);
  // setup a for loop to generate the savedRecipeButtons based on the length
  //of the loadedRecipes array.
  for (var i = 0; i < loadedRecipes.length; i++) {
    //created variable to create a button.
    var buttonOne = document.createElement("button");
    //created variable for recipe history div element.
    var buttonDiv = document.getElementById("saved-recipes-ls");
    //setting each CREATED button w/ an id of the recipe name that matched up w/ the current index of the local
    //storage array.
    buttonOne.setAttribute("id", loadedRecipes[i].name);
    //setting each dynamically created buttons with the text of it's current
    // loadedRecipes index.
    buttonOne.innerHTML = loadedRecipes[i].name;
    // appending the dynamically created button to the saved.html page.
    buttonDiv.appendChild(buttonOne);
    // setting up an "on click" attribute to run the displayRecipesAgain function
    buttonOne.setAttribute(
      "onclick",
      //pushing the recipe id to the displayRecipesAgain function.
      "displayRecipesAgain('" + loadedRecipes[i].id + "')"
    );
  }
}

function displayRecipesAgain(recId) {
  fetch(`https://api.spoonacular.com/recipes/${recId}/card?${apiKey2}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var recCardURL = data.url;
      console.log(recCardURL);
      //created variable html elment to get the recCardPicEl
      var recCardPicEl = document.getElementById("recImg2");
      //set the img source as the recCardURL.
      recCardPicEl.src = recCardURL;
      //removed the "hide" class so that the image will show when the recipe is searched.
      recCardPicEl.removeAttribute("class", "hide");
    });
}

window.onload = function () {
  getLocalStorage();
};

function clearHistory() {
  localStorage.clear();
  location.reload();
}
