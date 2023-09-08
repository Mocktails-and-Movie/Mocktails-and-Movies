var drinkData =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
var firstLetter = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"; //user value
var apiKey = "875ec0f5dd7c483c223ff8cc9a55ef3e";
var movieButton = document.querySelector("#loadRandomMovie");
var randomMovieDiv = document.getElementById("randomMovie");

movieButton.addEventListener("click", handleClick);

function handleClick(event) {
  event.preventDefault();

  var genreSelect = document.getElementById("genre");
  var selectedGenre = genreSelect.value;
  var selectedGenreValue = genreSelect.options[genreSelect.selectedIndex].getAttribute("value");
  if (!selectedGenre) {
    window.alert("Please select a genre");
  } else {
    localStorage.setItem("selectedGenreValue", selectedGenreValue);
  }

  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}`
  )
    .then((response) => response.json())
    .then((data) => {
      var randomIndex = Math.floor(Math.random() * data.results.length);
      var selectedMovie = data.results[randomIndex];
      localStorage.setItem("selectedMovie", JSON.stringify(selectedMovie));
      // Redirect to the results page
      window.location.href = "./results.html";
    })
    .catch((error) => console.error("Error fetching movies:", error));
}

// function readFromLocalStorage() {
//   var storedMovie = localStorage.getItem("selectedMovie");
//   if (storedMovie) {
//     storedMovie = JSON.parse(storedMovie);
//   } else {
//     storedMovie = [];
//   }
//   return storedMovie;
// }

// function printFromLocal() {
//   // Redirect to the results page
//   window.location.href = "./results.html";
//   var movie = readFromLocalStorage();
//   var movieTitleEl = document.createElement("h2");
//   var movieOverviewEl = document.createElement("p");
//   var movieImageEl = document.createElement("img");

//   randomMovieDiv.textContent = movie.title;
//   movieTitleEl.textContent = movie.overview;
//   movieOverviewEl.textContent = dayjs(movie.release_date).format(
//     "MMMM DD, YYYY"
//   );
//   movieImageEl.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
//   movieImageEl.alt = movie.title + " poster";

//   randomMovieDiv.appendChild(movieTitleEl);

//   randomMovieDiv.appendChild(movieOverviewEl);

//   randomMovieDiv.appendChild(movieImageEl);
// }

// printFromLocal();

// function displayMovie() {
//   var storedMovie = localStorage.getItem("selectedMovie");

//   if (storedMovie) {
//     var movie = JSON.parse(storedMovie);

//     var movieTitleEl = document.createElement("h2");
//     var movieOverviewEl = document.createElement("p");
//     var movieImageEl = document.createElement("img");

//     randomMovieDiv.textContent = movie.title;
//     movieTitleEl.textContent = movie.overview;
//     movieOverviewEl.textContent = dayjs(movie.release_date).format(
//       "MMMM DD, YYYY"
//     );
//     movieImageEl.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
//     movieImageEl.alt = movie.title + " poster";

//     randomMovieDiv.appendChild(movieTitleEl);

//     randomMovieDiv.appendChild(movieOverviewEl);

//     randomMovieDiv.appendChild(movieImageEl);
//   } else {
//     console.log("No movie found in local storage.");
//   }
// }

fetch(drinkData).then(function (response) {
  console.log("response", response);
  if (response.ok) {
    response.json().then(function (drinkData) {
      console.log("DATA:", drinkData);
    });
  } else {
    alert("Error, please try again");
  }
});
