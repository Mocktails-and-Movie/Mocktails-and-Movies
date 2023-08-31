# Mocktails-and-Movies

#User Story

Psedo-Code:

1. The structure of the HTML.
   A. Two htmls required
   i. one html is the home page
   a. User Input:
   Search by: Genre: Adventure, Action, Science Fiction, etc.
   CSS Tailwinds - search for html that has drop-down functionality for HTML.
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
   First button - reinitalizes the movie match and dirnk
   Second button - sends user back to the home page and to view favorites.
