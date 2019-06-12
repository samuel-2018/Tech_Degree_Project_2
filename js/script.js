/** ****************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
***************************************** */

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


let list = document.querySelectorAll('.student-list > .student-item');
// let searchResult = [];

// let page = 1;

const showPage = (list, page) => {
  const startIndex = (page * 10) - 10;
  const endIndex = (page * 10) - 1;

  list.forEach((item, index) => {
    if (index >= startIndex && index <= endIndex) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });


  // if (searchResult === null) {
  //   list.forEach((item, index) => {
  //     if (index >= startIndex && index <= endIndex) {
  //       item.style.display = '';
  //     } else {
  //       item.style.display = 'none';
  //     }
  //   });
  // }

  // else {
  //   list.forEach(item => item.style.display = 'none');

  //   searchResult.forEach((item, index) => {
  //     if (index >= startIndex && index <= endIndex) {
  //       item.style.display = '';
  //     } else {
  //       item.style.display = 'none';
  //     }
  //   });
  //   const pagination = document.querySelector('.pagination');
  //   document.querySelector('.page').removeChild(pagination);  
  //   appendPageLinks(searchResult);
  // }
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
  const pages = Math.ceil(list.length / 10);
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
  document.querySelector('.page-header').appendChild(div);
}
appendSearchform();

function handleSearch() {
  list = document.querySelectorAll('.student-list > .student-item');
  // const event = e.target;
  const searchInput = document.querySelector('.searchInput').value;
  // const listNames = list.querySelectorAll('.student-details > h3')
  // let searchResult = [];
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    const name = element.querySelector('h3').textContent;

    const test = element.className;

    // console.log(test);
    // console.log(test.indexOf('isResult') > -1);
    
    if (name.includes(searchInput)) {
      element.className.includes(' isResult') ? '' : element.className += ' isResult';
    } else {
      element.className = element.className.replace(' isResult', '');
    }
  }
  const searchResult = document.querySelectorAll('.student-list > .isResult');

  list.forEach(item => item.style.display = 'none');
  list = searchResult;
  showPage(list, 1);
  const pagination = document.querySelector('.pagination');
  document.querySelector('.page').removeChild(pagination);
  appendPageLinks(searchResult);
  // showPage(list, 1, searchResult);
  // appendPageLinks(list);
}
