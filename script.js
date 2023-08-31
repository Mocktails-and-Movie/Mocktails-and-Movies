var drinkData =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
var movieApi = "https://api.themoviedb.org/3/movie/11?api_key=";
var firstLetter = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"; //user value
var apiKey = "875ec0f5dd7c483c223ff8cc9a55ef3e";

var newLink = movieApi + apiKey;


//fetching Data
fetch(newLink).then(function (response) {
  console.log("response", response);
  if (response.ok) {
    response.json().then(function (movieData) {
      console.log("DATA:", movieData);
    });
  } else {
    alert("Error, please try again");
  }
});

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
