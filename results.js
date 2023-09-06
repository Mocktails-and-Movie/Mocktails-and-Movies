var drinkData =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
var firstLetter = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"; //user value
var apiKey = "875ec0f5dd7c483c223ff8cc9a55ef3e";
var movieButton = document.querySelector("#loadRandomMovie");
var randomMovieDiv = document.getElementById("randomMovie");

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

printFromLocal();
