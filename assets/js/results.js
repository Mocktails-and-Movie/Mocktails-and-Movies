var nonAlcoholicEndpoint =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
var cocktailByLetterEndpoint =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=";
var drinkButton = document.querySelector(".drunkButton");
var apiKey = "875ec0f5dd7c483c223ff8cc9a55ef3e";
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
    // movieDetails();
    var randomMovieDiv = document.getElementById("randomMovie");
    var movieTitleEl = document.createElement("h2");
    var movieDate = document.createElement("p");
    var movieOverviewEl = document.createElement("p");
    var movieImageEl = document.createElement("img");
    movieTitleEl.textContent = movie.title;
    movieOverviewEl.textContent = movie.overview;
    movieDate.textContent =
      "Release Date: " + "" + dayjs(movie.release_date).format("MMMM DD, YYYY");

    movieImageEl.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    movieImageEl.alt = movie.title + " poster";
    randomMovieDiv.appendChild(movieTitleEl);
    randomMovieDiv.appendChild(movieDate);

    randomMovieDiv.appendChild(movieImageEl);
    randomMovieDiv.appendChild(movieOverviewEl);
  } else {
    console.log("No movie found in localStorage");
  }
}
function fetchAndDisplayRandomDrinks(letter) {
  fetch(cocktailByLetterEndpoint + letter)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var alcoholicDrinks = [];
      var nonAlcoholicDrinks = [];
      var drinks = data.drinks;
      if (drinks && drinks.length > 0) {
        drinks.forEach(function (drink) {
          if (drink.strAlcoholic === "Alcoholic") {
            alcoholicDrinks.push(drink);
          } else {
            nonAlcoholicDrinks.push(drink);
          }
        });
      }
      var drinkDisplay = document.querySelector(".drink-wrapper");
      drinkDisplay.innerHTML = "";
      // Display an alcoholic drink
      if (alcoholicDrinks.length > 0) {
        var randomAlcoholicIndex = Math.floor(
          Math.random() * alcoholicDrinks.length
        );
        var randomAlcoholicDrink = alcoholicDrinks[randomAlcoholicIndex];
        displayDrink(randomAlcoholicDrink, "Alcoholic");
      }
      // Display a non-alcoholic drink, or a similar alcoholic one if not found
      if (nonAlcoholicDrinks.length > 0) {
        var randomNonAlcoholicIndex = Math.floor(
          Math.random() * nonAlcoholicDrinks.length
        );
        var randomNonAlcoholicDrink =
          nonAlcoholicDrinks[randomNonAlcoholicIndex];
        displayDrink(randomNonAlcoholicDrink, "Non_Alcoholic");
      } else if (alcoholicDrinks.length > 0) {
        var randomAlcoholicIndex = Math.floor(
          Math.random() * alcoholicDrinks.length
        );
        var randomAlcoholicDrink = alcoholicDrinks[randomAlcoholicIndex];
        displayDrink(randomAlcoholicDrink, "Non_Alcoholic");
      } else {
        console.log("No matching drinks found for the letter " + letter);
      }
    })
    .catch(function (error) {
      console.error("Error fetching data: " + error);
    });
}
drinkButton.addEventListener("click", function () {
  var movie = readFromLocalStorage();
  var firstLetter = movie.title.charAt(0).toLowerCase();
  fetchAndDisplayRandomDrinks(firstLetter);
});
function displayDrink(drink, category) {
  var drinksContainer = document.createElement("div");
  drinksContainer.className = "drinks-container";
  // var drinksContainer = document.querySelector('.drinks-container')
  var drinksTitle = document.createElement("h3");
  drinksTitle.textContent = category;
  drinksContainer.appendChild(drinksTitle);
  var drinkElement = document.createElement("div");
  drinkElement.className = "drink";
  // var drinkElement = document.querySelector('.drink')
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
  var drinkDisplay = document.querySelector(".drink-wrapper");

  drinkDisplay.appendChild(drinksContainer);
}
printFromLocal();
drinkButton.addEventListener("click", function () {
  var movie = readFromLocalStorage();
  var firstLetter = movie.title.charAt(0).toLowerCase();
  // fetchAndDisplayRandomDrink("Non_Alcoholic", firstLetter);
  // fetchAndDisplayRandomDrink("Alcoholic", firstLetter);
});
var newMovieButton = document.querySelector(".newMovie");
// function newMovie() {
//   fetch(
//     `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       var randomIndex = Math.floor(Math.random() * data.results.length);
//       var selectedMovie = data.results[randomIndex];
//       localStorage.setItem("selectedMovie", JSON.stringify(selectedMovie));
//     })
//     .catch((error) => console.error("Error fetching movies:", error));
//   readFromLocalStorage();
//   printFromLocal();
// }

function getMovieId() {
  var movie = readFromLocalStorage();
  var movieId = movie.id;
  if (movie) {
    return movieId;
  }
}

var getMovieId = getMovieId();
var movieIdString = String(getMovieId);
console.log(movieIdString);

var baseMovieUrl = "https://api.themoviedb.org/3/movie/";
var movieDetailFetch = baseMovieUrl + movieIdString + "?api_key=" + apiKey;

function init() {
  fetch(movieDetailFetch).then(function (response) {
    console.log("response", response);
    if (response.ok) {
      response.json().then(function (movieDetails) {
        console.log("DATA:", movieDetails);
        displayMovieDetails(movieDetails);
      });
    } else {
      alert("Error, please try again");
    }
  });
}

function displayMovieDetails(movieDetails) {
  var randomMovieDiv = document.getElementById("randomMovie");
  var runTimeEl = document.createElement("p");
  runTimeEl.textContent =
    "Movie Length: " + "" + movieDetails.runtime + " " + " minutes";
  var runTimePlacement = randomMovieDiv.children[2];
  randomMovieDiv.insertBefore(runTimeEl, runTimePlacement);

  var tagLineEl = document.createElement("h4");
  tagLineEl.setAttribute(
    "style",
    "color:orange; font-size:36px; font-style:italic;"
  );
  tagLineEl.textContent = movieDetails.tagline;
  var tagLinePlacement = randomMovieDiv.children[4];
  randomMovieDiv.insertBefore(tagLineEl, tagLinePlacement);

  var ratingEl = document.createElement("p");
  ratingEl.textContent =
    "Movie Rating by voters: " +
    movieDetails.vote_average.toFixed(1) +
    " out of 10";
  console.log(ratingEl);
  ratingEl.setAttribute("style", " font-style:italic;");
  ratingElPlacement = randomMovieDiv.children[3];
  randomMovieDiv.insertBefore(ratingEl, ratingElPlacement);
}

init();

// function newMovieDisplay() {
//   var selectedGenreValue = localStorage.getItem("selectedGenreValue");
//   console.log(selectedGenreValue);
//   fetch(
//     `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenreValue}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       var randomIndex = Math.floor(Math.random() * data.results.length);
//       var selectedMovie = data.results[randomIndex];
//       localStorage.setItem("selectedMovie", JSON.stringify(selectedMovie));
//     })
//     .catch((error) => console.error("Error fetching movies:", error));
//   var randomMovie = document.getElementById("randomMovie");
//   randomMovie.innerHTML = "";
//   readFromLocalStorage();
//   printFromLocal();
// }

// newMovieButton.addEventListener("click", newMovieDisplay);
