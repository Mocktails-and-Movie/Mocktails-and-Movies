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
    var randomMovieDiv = document.getElementById("randomMovie");
    var movieTitleEl = document.createElement("h2");
    var movieDate = document.createElement("p");
    var movieOverviewEl = document.createElement("p");
    var movieImageEl = document.createElement("img");
    movieTitleEl.textContent = movie.title;
    movieOverviewEl.textContent = movie.overview;
    movieDate.textContent = movie.release_date;
    console.log(movieDate);
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
      // Display an alcoholic drink
      if (alcoholicDrinks.length > 0) {
        var randomAlcoholicIndex = Math.floor(Math.random() * alcoholicDrinks.length);
        var randomAlcoholicDrink = alcoholicDrinks[randomAlcoholicIndex];
        displayDrink(randomAlcoholicDrink, "Alcoholic");
      }
      // Display a non-alcoholic drink, or a similar alcoholic one if not found
      if (nonAlcoholicDrinks.length > 0) {
        var randomNonAlcoholicIndex = Math.floor(Math.random() * nonAlcoholicDrinks.length);
        var randomNonAlcoholicDrink = nonAlcoholicDrinks[randomNonAlcoholicIndex];
        displayDrink(randomNonAlcoholicDrink, "Non_Alcoholic");
      } else if (alcoholicDrinks.length > 0) {
        var randomAlcoholicIndex = Math.floor(Math.random() * alcoholicDrinks.length);
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

  drinkImage.addEventListener("click", function () {
    openModal(drink);
  });

  drinkElement.appendChild(drinkName);
  drinkElement.appendChild(drinkImage);
  drinksContainer.appendChild(drinkElement);

  var drinkDisplay = document.querySelector(".drink-wrapper");
  drinkDisplay.appendChild(drinksContainer);
}

printFromLocal();
drinkButton.addEventListener("click", function () {
  var movie = readFromLocalStorage();
  var firstLetter = movie.title.charAt(0).toLowerCase();
});
var newMovieButton = document.querySelector('.newMovie')
function newMovie (){
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}`
  )
    .then((response) => response.json())
    .then((data) => {
      var randomIndex = Math.floor(Math.random() * data.results.length);
      var selectedMovie = data.results[randomIndex];
      localStorage.setItem("selectedMovie", JSON.stringify(selectedMovie));
    })
    .catch((error) => console.error("Error fetching movies:", error));
    readFromLocalStorage();
    printFromLocal();
}
newMovieButton.addEventListener('click', newMovie);

function openModal(drink) {
  var modal = document.getElementById("drinkModal");
  var title = document.getElementById("drinkModalTitle");
  var content = document.getElementById("drinkModalContent");

  title.textContent = drink.strDrink;
  content.innerHTML = `
    <h4>Ingredients:</h4>
    <ul>
      <li>${drink.strIngredient1} - ${drink.strMeasure1}</li>
      <li>${drink.strIngredient2} - ${drink.strMeasure2}</li>
      <!-- Add more ingredients if needed -->
    </ul>
    <h4>Instructions:</h4>
    <p>${drink.strInstructions}</p>
  `;

  modal.classList.add("is-active");
}

function closeModal() {
  var modal = document.getElementById("drinkModal");
  modal.classList.remove("is-active");
}
