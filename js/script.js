/** ****************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
***************************************** */

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/** *
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.

   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.
** */
const list = document.querySelectorAll('.student-list > .student-item');
// console.log('The list: ', list, 'The list total: ', list.length);

// let page = 2;

/** *
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.

   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
** */
// list.forEach(item => item.style.display = 'none');

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
/** *
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
** */

// template from lines 119-137 in the examples/example-meets.html
// <!-- pagination HTML to create dynamically -->
// <div class="pagination">
//   <ul>
//     <li>
//       <a class="active" href="#">1</a>
//     </li>
//      <li>
//       <a href="#">2</a>
//     </li>
//      <li>
//       <a href="#">3</a>
//     </li>
//      <li>
//       <a href="#">4</a>
//     </li>
//      <li>
//       <a href="#">5</a>
//     </li>
//   </ul>
// </div>
// <!-- end pagination -->

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
  // document.querySelector('.page').appendChild(div);
  const ul = document.createElement('ul');
  div.appendChild(ul);
  for (let i = 1; i <= pages; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = i;
    // a.onclick = () => showPage(list, i); // check
    a.onclick = handleClick;
    i === 0 ? a.className = 'active' : '';
    li.appendChild(a);
    ul.appendChild(li);
  }
  document.querySelector('.page').appendChild(div);
}

appendPageLinks(list);





// Remember to delete the comments that came with this file, and replace them with your own code comments.
