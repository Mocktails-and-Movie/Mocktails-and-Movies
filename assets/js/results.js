var nonAlcoholicEndpoint =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
var cocktailByLetterEndpoint =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=";
var drinkButton = document.querySelector(".drunkButton");
var apiKey = "875ec0f5dd7c483c223ff8cc9a55ef3e";
var favoriteButton = document.querySelector(".favorite-button");

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
    movieImageEl.classList.add("movieImage");
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
    // console.log("No movie found in localStorage");
  }
}
function fetchAndDisplayRandomDrinks(letter) {
  //   var drinkDisplay = document.querySelector(".drink-wrapper");
  // drinkDisplay.innerHTML = "";

  // var drinksContainer = document.createElement("div");
  // drinksContainer.innerHTML = '';

  fetch(cocktailByLetterEndpoint + letter)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log("DATA:", data);

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

var drinkDisplay = document.querySelector(".drink-wrapper");

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
  drinkDisplay.appendChild(drinksContainer);
}

printFromLocal();
drinkButton.addEventListener("click", function () {
  var movie = readFromLocalStorage();
  var firstLetter = movie.title.charAt(0).toLowerCase();
});

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
  // console.log(ratingEl);
  ratingEl.setAttribute("style", " font-style:italic;");
  ratingElPlacement = randomMovieDiv.children[4];
  randomMovieDiv.insertBefore(ratingEl, ratingElPlacement);

  var listEl = document.createElement("ul");
  listEl.classList.add("genreList");
  var movieGenres = movieDetails.genres;
  for (var i = 0; i < movieGenres.length; i++) {
    var genreEl = document.createElement("li");
    genreEl.textContent = movieDetails.genres[i].name;
    listEl.appendChild(genreEl);
  }

  genrePlacement = randomMovieDiv.children[3];
  randomMovieDiv.insertBefore(listEl, genrePlacement);
  // console.log(listEl);
}

init();

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

function saveToFavorites() {
  var imageSrc = document.querySelector(".movieImage").getAttribute("src");
  var savedPosters = JSON.parse(localStorage.getItem("savedPosters")) || [];

  savedPosters.push(imageSrc);
  localStorage.setItem("savedPosters", JSON.stringify(savedPosters));

  displayMessage();
}

favoriteButton.addEventListener("click", saveToFavorites);

function displayMessage() {
  var savedItemId = document.querySelector(".displayFavoriteMessage");
  savedItemId.textContent = " Your favorite movie was saved to the homepage!";

  setTimeout(function () {
    savedItemId.textContent = "";
  }, 5000);
}
