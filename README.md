# Mocktails-and-Movies

Live link: https://mocktails-and-movie.github.io/Mocktails-and-Movies/

Screenshot of deployed app: (./assets/css/images/liveLink.png)

#User Story

As user, I want to find a movie to watch based on genre.
When I click a button, a movie should display on the second page.
If I like the movie that is selected,
I can click a second button to receive two drink types.
The drink types should begin with the first letter of of the move that was displayed.

Pseudo-Code:

1. The structure of the HTML.
   A. Two htmls required
   i. one html is the home page
   a. User Input:
   Search by: Genre: Adventure, Action, Science Fiction, etc.
   CSS Bulma - search for html that has drop-down functionality for HTML.
   Create Button that takes you to the search results of the drop feature.
   Make it pretty.
   b. second html is the results page
   i. After user input, the results page is displayed
   ii. How is the movie matched with genre logic?
   a. After the user selects the genre, a random movie will be displayed based on genre.
   b. The first letter of that movie is then used to match to it's mocktail.

   iiI. How do we want to "match" the result of the move to the mocktail?
   a. Take the first letter of the randomly generated movie. function for getting first letter of movie
   b. function for getting letter for drink, and take that result to apply it to mocktail and cocktail.
   c. two beverages are displayed: mocktail and cocktail (alcohol and non alocholic)
   d. if first letter of movie matches first letter of mocktail in array, display mocktail.
   e. if there is not a mocktail/cocktail that match the movie, "message" and display a randomly selected mocktail/cockatil for enjoyment.

   iv. on the search results.
   a. create a button to save to locale for a "favorite feature"
   a. Name of the Movie
   b. Name of the Cocktail
   c. Dream world - the picture.
   b. after the button is clicked, it is saved to local.
   c. the previously saved items are then displayed on the homepage of the app.
   create two buttons:
   First button - reinitalizes the movie match and drink.
   Second button - sends user back to the home page and to view favorites.

Challenges that were solved:

1. At first, we were not able to parse the movie data by genre. The movie API was confusing in the beginning. This challenge was overcome based on taking the genre id and correlating it to the genre value.

2. Displaying on the home page and not the result page. This was solved by saving the items to locale storage first, going to the result page, and then displaying on the results html.

3. Drink data - At first, we had the drink data and the movie data display all at one time. To have the user be more interactive with the page, we incorporated a second button that fetched the drink data based on the movie title.

4. CSS layout - Design elements that we liked took longer than anticipated after we had working functionality to the app. We wanted to make sure we had a clean, simple look that didn't have too many elements on the page. This lead directly into our Modal challenge for the mobile first design.

5. Working as a group for our first project was also a challenge. Working on the javascript as a group when something was not working was a challenge based on individual approaches. At times, it was helpful to speak through the challenge as a group. Other times, we were able to find different solutions individually and bring it back to the group. Working around our schedules that were not class times were also a challenge.

Current Challenges:

1. Mocktail category is displaying alcoholic drinks. The reason was determined that there was no mocktail available starting with that letter of the movie. Current investigating how do display the mocktail and cocktail drinks separately to the page.

2. Bulma's CSS framework was both easy and tricky to use. We were able to create the drop-down menu on the home page. We are trying to determine how to incorporate Bulma's modal into the mobile design for a clean finished look.

3. Saving the results to the home page as a "favorite".

References:

1. https://stackoverflow.com/questions/24092076/greyscale-background-image-but-not-content

2. Bulma CSS framework reference. Using select: https://bulma.io/documentation/form/select/

3. https://www.youtube.com/watch?v=vHuSz4fRM88: CSS layout review.

4. Using local storage: https://blog.logrocket.com/localstorage-javascript-complete-guide/

5. Movie API: https://developer.themoviedb.org/reference/intro/getting-started

6. Drink API: https://www.thecocktaildb.com/api.php

7. https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore. 

8. Movie id results https://www.themoviedb.org/talk/5daf6eb0ae36680011d7e6ee
