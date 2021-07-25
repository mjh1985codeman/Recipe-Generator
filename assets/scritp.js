//1. Create event Listener for the Submit button to capture text input.
//2. Capture Text Input (Ingredient List).
//3. Pass that Input to the API to get the Recipe List.

//Global Variables:
var apiKey = "";
var ingredientList = [];
var ingTextInput = document.getElementById("ing-input");

//Variable for Submit Button Element.
var submitButtonEl = document.getElementById("submit-btn");
//Event Listener for submitButtonEl variable to call getIngTextInput Function.
submitButtonEl.addEventListener("click", getIngTextInput);
submitButtonEl.addEventListener("click", getRecipe);

//Function to capture Text Input and save that to a local variable searchedIngs
function getIngTextInput(e) {
  e.preventDefault();
  var searchedIngs = ingTextInput.value.trim();
  //capturing the searchedIngs and passing that as the argument
  //for the getRecipe function.
  getRecipe(searchedIngs);
}

//Function to capture the searchedIngs as the "ingredients" argument for the
// api fetch to get the recipe for the ingredients list.
function getRecipe(ings) {
  console.log(ings);
}

console.log("Your JS in linked");
