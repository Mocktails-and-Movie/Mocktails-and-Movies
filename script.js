var drinkData =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
  var firstLetter = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"; //user value
  const apiKey = '875ec0f5dd7c483c223ff8cc9a55ef3e'; 
  const movieButton = document.getElementById('loadRandomMovie')

  document.getElementById('loadRandomMovie').addEventListener('click', loadRandomMovie);
  
  function loadRandomMovie() {
      const selectedGenre = document.getElementById('genre').value;
  
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}`)
          .then(response => response.json())
          .then(data => {
              const randomIndex = Math.floor(Math.random() * data.results.length);
              displayRandomMovie(data.results[randomIndex]);
          })
          .catch(error => console.error('Error fetching movies:', error));
  }
  
  function displayRandomMovie(movie) {
    
    window.location.replace("./results.html")
    const randomMovieDiv = document.getElementById('randomMovie');
    // randomMovieDiv.innerHTML = ''; 
    const movieElement = document.createElement('div');
    movieTitle = document.createElement("h2")
    movieOverview = document.createElement("p")
      movieElement.innerHTML = `
          <h2>${movie.title}</h2>
          <p>${movie.overview}</p>
          <p>Release Date: ${movie.release_date}</p>
          <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title} Poster">
          `;
      
  
      randomMovieDiv.appendChild(movieElement);
  }
  movieButton.on("click", displayRandomMovie)
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
