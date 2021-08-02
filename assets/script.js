//Global Variables:
var apiKey = "apiKey=6e8a92552104438f980149e4f5829086";
var apiKey2 = "apiKey=c3283e8f374c4709a08d9c074a13d89f";
var ingTextInput = document.getElementById("ing-input");

//To prevent local storage from writing over itself upon refresh and recipe search.
//Set the variable to get what is already in local storage or if nothing is there then it
//establishes an empty array.
var savedRecipes = JSON.parse(localStorage.getItem("saved-recipes") || "[]");
//variable for the quote element.
var quoteOfTheDayEl = document.getElementById("quote-of-the-day");
//variable for error message
// var errorEl = document.getElementById("error");

//Variable for Submit Button Element.
var submitButtonEl = document.getElementById("submit-btn");
//Event Listener for submitButtonEl variable to call getIngTextInput Function.
submitButtonEl.addEventListener("click", getIngTextInput);

//Function to capture the searchedIngs as the "ingredients" argument for the
//Function to capture Text Input and save that to a local variable searchedIngs
function getIngTextInput(e) {
  e.preventDefault();
  var searchedIngs = ingTextInput.value.trim();
  //capturing the searchedIngs and passing that as the argument
  //for the getRecipe function.
  getRecipe(searchedIngs);
}

// api fetch to get the recipe for the ingredients list.
function getRecipe(ings) {
  console.log("Test " + ings);
  fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?${apiKey2}&ingredients=${ings}&number=10`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //validation to display that there was an error if no data returned from api.
      if (data.length === 0) {
        console.log(data);
        var myModal = $("#exampleModal");
        console.log(myModal);
        myModal.modal("show");
        return;
      }
      console.log(data);
      //Using the Math.random method I created a randomData variable based on the api data to get a random recipe of the 10 recipe objects
      //That get returned via the api.
      var randomData = data[Math.floor(Math.random() * data.length)];
      //Saves the recipe name as the local variable recName
      var recName = randomData.title;
      // drilled down the data to get the recipe id (id) and saved that to the local var recId.
      var recId = randomData.id;
      //creating a recipe object variable to use w/ local storage.
      //Name so we can use that on the localstorge.js file to display the name on the
      //dynamically created buttons.  And the id as that is what the api requires to
      //get the recipe card.
      var recObj = {
        name: recName,
        id: recId,
      };

      //pushing the recicpe object to the addToSaved Function.
      addToSaved(recObj);

      //pushing the recId to the getRecipeCard function as the argument.
      getRecipeCard(recId);
    });
}

//function to save the recipe title and id to local storage.
function addToSaved(saved) {
  // If index of savedRecipes is false then return
  if (savedRecipes.indexOf(saved) !== -1) {
    return;
  }
  savedRecipes.push(saved);
  localStorage.setItem("saved-recipes", JSON.stringify(savedRecipes));
}

function getRecipeCard(recId) {
  // api call to get the recipe card URL
  fetch(`https://api.spoonacular.com/recipes/${recId}/card?${apiKey2}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data);
      //console.log(data.url);
      var recCardURL = data.url;
      //created variable html elment to get the recCardPicEl
      var recCardPicEl = document.getElementById("recImg");
      //set the img source as the recCardURL.
      recCardPicEl.src = recCardURL;
      //  removed the "hide" class so that the image will show when the recipe is searched.
      recCardPicEl.removeAttribute("class", "hide");
    });
}

// Second API (function to get the data from the api (quotes)).
function getQuotes() {
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data);
      var apiQuotes = data;
      //created for loop to loop over the array of objects and get the text from them.
      var randomQuoteArray = [];
      for (var i = 0; i < apiQuotes.length; i++) {
        // combined the quote (data.text) and the author (data.author) and saved that as a variable.
        var quotesAndAuthors = JSON.stringify(
          data[i].text + " - " + data[i].author
        );
        // This pushes the quotesAndAuthors into an array called randomQuoteArray
        randomQuoteArray.push(quotesAndAuthors);
      }
      //created randomQuote variable using the randomQuoteArray and the Math.random array method
      //to pull out a random quote of the array.
      var randomQuote =
        randomQuoteArray[Math.floor(Math.random() * randomQuoteArray.length)];
      //the pushes the randomQuote variable as the argument for the displayRandomQuote Function.
      displayRandomQuote(randomQuote);
    });
}
// This function takes the random quote and writes it to the page.
function displayRandomQuote(randomQuoteData) {
  //console.log(randomQuoteData);
  quoteOfTheDayEl.innerHTML = randomQuoteData;
}

//functions that run when the page is loaded.
window.onload = function () {
  getQuotes();
  displayRandomQuote();
};
