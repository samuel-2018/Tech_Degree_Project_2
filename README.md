# Tech_Degree_Project_2
Project 2: List Pagination and Filtering (Tech Degree)

## Description 

This project uses progressive enhancement to turn a plain HTML and CSS webpage into one that is both paginated and searchable.

This added functionality, with JavaScript, layers onto the existing page. Turning a long list into something more user friendly, for those who have JavaScript enabled.

## Skills, techniques and process

This project required knowledge of JavaScript and DOM manipulation.

Restricting how many items were displayed per page involved altering the style.display attribute on list items. 

Pagination was determined by taking into consideration both the total number of items and the number of items to display per page. The user clicking on a page number results in displaying the items in the corresponding range.

The search feature works both on click of the search button and in real time as the user types. To facilitate this, the global list of items and values determining whether an item is displayed are reset on search. 

Then, the search function can filter out those results that do not match the current search term. The matching list is set as the global list and passed on to the functions responsible for updating the page.

## “Extra Credit” Features

* A search component that filters the list based on the search term. 

* Pagination that corresponds to the search results.

* A message that informs the user when there are no search results.
