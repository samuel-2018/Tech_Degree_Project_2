/* eslint-disable no-param-reassign */
/** ****************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
***************************************** */

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

// initializes global list, will be updated by handleSearch
let list = document.querySelectorAll('.student-list > .student-item');
// sets the number of items to show per page
const itemsPerPage = 10;

function appendNoResultsMsg() {
  const div = document.createElement('div');
  div.textContent = 'No results.';
  div.style.display = 'none';
  div.className = 'js-msg--no-results';
  div.style = 'text-align: center; margin-top: 4rem';
  document.querySelector('.page').appendChild(div);
}
appendNoResultsMsg();

const showPage = (list, page) => {
  const startIndex = (page * itemsPerPage) - itemsPerPage;
  const endIndex = (page * itemsPerPage) - 1;

  list.forEach((item, index) => {
    if (index >= startIndex && index <= endIndex) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });

  if (list.length === 0) {
    const msg = document.querySelector('.js-msg--no-results');
    msg.style.display = '';
  } else {
    const msg = document.querySelector('.js-msg--no-results');
    msg.style.display = 'none';
  }
};

function handleClick(e) {
  const event = e.target;
  const pagination = document.querySelectorAll('.pagination > ul > li > a'); // could add a class so a long selector isn't necessary
  pagination.forEach(item => item.className = '');
  event.className = 'active';
  const newPage = event.textContent;
  showPage(list, newPage);
}

const appendPageLinks = (list) => {
  const pages = Math.ceil(list.length / itemsPerPage);
  const div = document.createElement('div');
  div.className = 'pagination';
  const ul = document.createElement('ul');
  div.appendChild(ul);
  for (let i = 1; i <= pages; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = i;
    a.onclick = handleClick;
    i === 0 ? a.className = 'active' : '';
    li.appendChild(a);
    ul.appendChild(li);
  }
  document.querySelector('.page').appendChild(div);
};

showPage(list, 1);
appendPageLinks(list);

// You can reference the examples/example-exceeds.html file, lines 16-19, to see an example of the markup you'll create.

// <!-- student search HTML to add dynamically -->
// <div class="student-search">
//   <input placeholder="Search for students...">
//   <button>Search</button>
// </div>
// <!-- end search -->

function appendSearchform() {
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
  button.onclick = handleSearch;
  input.onkeyup = handleSearch;
  document.querySelector('.page-header').appendChild(div);
}
appendSearchform();

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
