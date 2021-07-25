//1. Create event Listener for the Submit button to capture text input. (done)
//2. Capture Text Input (Ingredient List). (done)
//3. Pass that Input to the API to get the Recipe List.

//Global Variables:
var apiKey = "apiKey=6e8a92552104438f980149e4f5829086";
var ingredientList = [];
var ingTextInput = document.getElementById("ing-input");

//Variable for Submit Button Element.
var submitButtonEl = document.getElementById("submit-btn");
//Event Listener for submitButtonEl variable to call getIngTextInput Function.
submitButtonEl.addEventListener("click", getIngTextInput);
submitButtonEl.addEventListener("click", getRecipe);

//Function to capture the searchedIngs as the "ingredients" argument for the
//Function to capture Text Input and save that to a local variable searchedIngs
function getIngTextInput(e) {
  e.preventDefault();
  var searchedIngs = ingTextInput.value.trim();
  //capturing the searchedIngs and passing that as the argument
  //for the getRecipe function.
  getRecipe(searchedIngs);
}
console.log("Your JS in linked");
// api fetch to get the recipe for the ingredients list.
function getRecipe(ings) {
  console.log("Test " + ings);
  fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?${apiKey}&ingredients=${ings}&number=1`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
