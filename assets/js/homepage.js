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
  var selectedGenreValue =
    genreSelect.options[genreSelect.selectedIndex].getAttribute("value");
  if (selectedGenreValue === 0) {
    window.alert("Please select a genre");
    return; 
  } else {
    localStorage.setItem("selectedGenreValue", selectedGenreValue);

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
}

function loadFavorites() {
  var savedPosters = JSON.parse(localStorage.getItem("savedPosters")) || [];
  var favoritesEl = document.querySelector("#favorites");

  for (var i = 0; i < savedPosters.length; i++) {
    var img = document.createElement("img");
    img.setAttribute("src", savedPosters[i]);
    favoritesEl.appendChild(img);
  }
}

loadFavorites();

var deleteButton = document.querySelector(".delete-button");
function deleteFavorites() {
  localStorage.removeItem("savedPosters");
  location.reload();
}

deleteButton.addEventListener("click", deleteFavorites);

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
