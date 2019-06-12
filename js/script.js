/** ****************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
***************************************** */

// Initializes global list; will be updated by handleSearch.
let list = document.querySelectorAll('.student-list > .student-item');

// Sets the number of items to show per page.
const itemsPerPage = 10;

// Creates element to display 'No results' as needed.
function appendNoResultsMsg() {
  const div = document.createElement('div');
  div.textContent = 'No results.';
  div.style.display = 'none';
  div.className = 'js-msg--no-results';
  div.style = 'text-align: center; margin-top: 4rem';
  document.querySelector('.page').appendChild(div);
}

const showPage = (list, page) => {
  // Calculates range of student items to show on page.
  const startIndex = (page * itemsPerPage) - itemsPerPage;
  const endIndex = (page * itemsPerPage) - 1;

  // Updates 'display' for each student item.
  list.forEach((studentItem, index) => {
    if (index >= startIndex && index <= endIndex) {
      // In range, display.
      studentItem.style.display = '';
    } else {
      // Otherwise, hide.
      studentItem.style.display = 'none';
    }
  });

  // If the list is empty, activates 'No results' message.
  if (list.length === 0) {
    const msg = document.querySelector('.js-msg--no-results');
    msg.style.display = '';
  } else {
    // If the list is NOT empty, deactivates 'No results' message.
    const msg = document.querySelector('.js-msg--no-results');
    msg.style.display = 'none';
  }
};

// Handles clicks on page numbers.
function handleClick(e) {
  const event = e.target;
  const pagination = document.querySelectorAll('.pagination > ul > li > a');
  // Clears class name from all page number elements.
  pagination.forEach(pageNumber => pageNumber.className = '');
  // Adds 'active' class to page number clicked.
  event.className = 'active';
  // Gets page number clicked.
  const newPage = event.textContent;
  // Calls for display of new page, passing number clicked.
  showPage(list, newPage);
}

const appendPageLinks = (list) => {
  // Calculates number of pages.
  const pages = Math.ceil(list.length / itemsPerPage);

  // Creates container element.
  const div = document.createElement('div');
  div.className = 'pagination';
  const ul = document.createElement('ul');
  div.appendChild(ul);

  // Creates page links.
  for (let i = 1; i <= pages; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = i;
    a.onclick = handleClick;
    // If first page, sets as active.
    i === 0 ? a.className = 'active' : '';
    li.appendChild(a);
    ul.appendChild(li);
  }
  // Adds pagination to bottom of page.
  document.querySelector('.page').appendChild(div);
};

function appendSearchform() {
  // Creates the search form.
  const div = document.createElement('div');
  const input = document.createElement('input');
  const button = document.createElement('button');
  div.appendChild(input);
  div.appendChild(button);
  div.className = 'student-search';
  input.placeholder = 'Search for students...';
  input.className = 'searchInput';
  button.textContent = 'Search';
  button.href = '#';
  // Searches on button click.
  button.onclick = handleSearch;
  // Searches as the user types.
  input.onkeyup = handleSearch;
  // Adds search form to top of page.
  document.querySelector('.page-header').appendChild(div);
}

function handleSearch() {
  function globalReset() {
    // Resets global list
    list = document.querySelectorAll('.student-list > .student-item');
    list.forEach((studentItem) => {
      // Hides all items
      studentItem.style.display = 'none';
      // Removes isResult class
      studentItem.className = studentItem.className.replace(' isResult', '');
    });
  }

  function getSearchInput() {
    // Note: If adding features, getSearchInput could handle other sources of input.
    // Gets search input.
    const searchInput = document.querySelector('.searchInput').value;
    return searchInput;
  }

  function getSearchResult(searchInput) {
    // Adds class 'isResult' to each studentItem that matches search term.
    for (let i = 0; i < list.length; i++) {
      const studentItem = list[i];
      const name = studentItem.querySelector('h3').textContent;
      if (name.includes(searchInput)) {
        studentItem.className += ' isResult';
      }
    }
    // Creates a list of elements with 'isResult' class.
    const searchResult = document.querySelectorAll('.student-list > .isResult');
    return searchResult;
  }

  function updatePagination(searchResult) {
    // Removes pagination element.
    const pagination = document.querySelector('.pagination');
    document.querySelector('.page').removeChild(pagination);
    // Creates pagination again with new search results.
    appendPageLinks(searchResult);
  }

  // Resets global list, hides all items
  globalReset();

  // Gets search input.
  const searchInput = getSearchInput();

  // Gets search result.
  const searchResult = getSearchResult(searchInput);

  // Updates global list with search result.
  list = searchResult;

  // Refreshes page.
  showPage(list, 1);

  // Updates page links.
  updatePagination(searchResult);
}

// Initialize page.
appendNoResultsMsg();
showPage(list, 1);
appendPageLinks(list);
appendSearchform();
