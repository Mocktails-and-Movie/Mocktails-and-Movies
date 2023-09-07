
var nonAlcoholicEndpoint = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
var cocktailByLetterEndpoint = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=";
var drinkButton = document.querySelector(".drink");

function readFromLocalStorage() {
  var storedMovie = localStorage.getItem("selectedMovie");
  if (storedMovie) {
    storedMovie = JSON.parse(storedMovie);
    return storedMovie;
  } else {
    return null;
  }
}
function printFromLocal() {
  var movie = readFromLocalStorage();
  if (movie) {
    var randomMovieDiv = document.getElementById("randomMovie");
    var movieTitleEl = document.createElement("h2");
    var movieDate = document.createElement("p");
    var movieOverviewEl = document.createElement("p");
    var movieImageEl = document.createElement("img");
    movieTitleEl.textContent = movie.title;
    movieOverviewEl.textContent = movie.overview;
    movieDate.textContent = movie.release_date;
    movieImageEl.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    movieImageEl.alt = movie.title + " poster";
    randomMovieDiv.appendChild(movieTitleEl);
    randomMovieDiv.appendChild(movieDate);
    randomMovieDiv.appendChild(movieOverviewEl);
    randomMovieDiv.appendChild(movieImageEl);
   
  } else {
    console.log("No movie found in localStorage");
  }
}
function fetchAndDisplayRandomDrink(category, letter) {
  fetch(cocktailByLetterEndpoint + letter)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var drinks = data.drinks;
      if (drinks && drinks.length > 0) {
        var randomIndex = Math.floor(Math.random() * drinks.length);
        var randomDrink = drinks[randomIndex];
        displayDrink(randomDrink, category);
      } else {
        console.log(`No matching ${category} drinks found for the letter ${letter}`);
      }
    })
    .catch(function (error) {
      console.error("Error fetching data: " + error);
    });
}
function displayDrink(drink, category) {
  var drinksContainer = document.createElement("div");
  drinksContainer.className = "drinks-container";
  var drinksTitle = document.createElement("h3");
  drinksTitle.textContent = category;
  drinksContainer.appendChild(drinksTitle);
  var drinkElement = document.createElement("div");
  drinkElement.className = "drink";
  var drinkName = document.createElement("h4");
  drinkName.textContent = drink.strDrink;
  var drinkImage = document.createElement("img");
  drinkImage.src = drink.strDrinkThumb;
  drinkImage.alt = drink.strDrink;
  var ingredientsTitle = document.createElement("p");
  ingredientsTitle.textContent = "Ingredients:";
  var ingredientsList = document.createElement("ul");
  for (var i = 1; i <= 15; i++) {
    var ingredient = drink["strIngredient" + i];
    var measure = drink["strMeasure" + i];
    if (ingredient && ingredient.trim() !== "") {
      var listItem = document.createElement("li");
      listItem.textContent = `${measure ? measure + " " : ""}${ingredient}`;
      ingredientsList.appendChild(listItem);
    } else {
      break;
    }
  }
  var instructionsTitle = document.createElement("p");
  instructionsTitle.textContent = "Instructions:";
  var instructions = document.createElement("p");
  instructions.textContent = drink.strInstructions;
  drinkElement.appendChild(drinkName);
  drinkElement.appendChild(drinkImage);
  drinkElement.appendChild(ingredientsTitle);
  drinkElement.appendChild(ingredientsList);
  drinkElement.appendChild(instructionsTitle);
  drinkElement.appendChild(instructions);
  drinksContainer.appendChild(drinkElement);
  var randomMovieDiv = document.getElementById("randomMovie");
  randomMovieDiv.appendChild(drinksContainer);
}
printFromLocal();

drinkButton.addEventListener("click", function(){
  var movie = readFromLocalStorage();
  var firstLetter = movie.title.charAt(0).toLowerCase();
  fetchAndDisplayRandomDrink("Non_Alcoholic", firstLetter);
  fetchAndDisplayRandomDrink("Alcoholic", firstLetter);

});

