var drinkData =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
var firstLetter = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"; //user value
var apiKey = "875ec0f5dd7c483c223ff8cc9a55ef3e";
var movieButton = document.querySelector("#loadRandomMovie");
var randomMovieDiv = document.getElementById("randomMovie");

// Event listener for the "Let's go to the movies!" button
movieButton.addEventListener("click", handleClick);

function handleClick(event) {
  event.preventDefault();

  var genreSelect = document.getElementById("genre");
  var selectedGenre = genreSelect.value;

  if (!selectedGenre) {
    window.alert("Please select a genre");
    // Change this to a pop-up or other error handling method.
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

// Event listener for saving a movie to favorites
var saveFavoritesButton = document.querySelector("#saveFavorites");
saveFavoritesButton.addEventListener("click", function () {
  var selectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
  if (selectedMovie) {
    var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push(selectedMovie);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Movie added to favorites!");
  } else {
    console.log("No selected movie found in localStorage");
  }
});

// Function to fetch and display drink data
function fetchAndDisplayDrinkData() {
  fetch(drinkData)
    .then(function (response) {
      console.log("response", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error fetching data");
      }
    })
    .then(function (drinkData) {
      console.log("DATA:", drinkData);
    })
    .catch(function (error) {
      console.error("Error:", error);
      alert("Error, please try again");
    });
}

// Call the function to fetch and display drink data
fetchAndDisplayDrinkData();
