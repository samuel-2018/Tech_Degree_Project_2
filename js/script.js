/** ****************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
***************************************** */

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


const list = document.querySelectorAll('.student-list > .student-item');

// let page = 2;

const showPage = (list, page) => {


  const startIndex = (page * 10) - 10;
  const endIndex = (page * 10) - 1;

  list.forEach((item, index) => {
    if (index >= startIndex && index <= endIndex) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
    // index >= startIndex && index <= endIndex ? item.style.display = '' : item.style.display = 'none';
  });
};

showPage(list, 1);

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
}

appendPageLinks(list);

