{
  ('use strict');

  // reference to template of 'template-book' and list 'book-list'
  const select = {
    templateOf: {
      bookProduct: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
    },
    elements: {
      bookImage: '.book__image',
      dataId: 'data-id',
      hidden: 'hidden',
    },
    filters: {
      filter: '.filters',
      filtersValue: 'value',
    },
  };

  const className = {
    bookFavorite: 'favorite',
  };

  // set up templated that compline from select object
  const templates = {
    bookProduct: Handlebars.compile(
      document.querySelector(select.templateOf.bookProduct).innerHTML
    ),
    bookList: Handlebars.compile(
      document.querySelector(select.containerOf.bookList).innerHTML
    ),
  };

  const favoriteBooks = [];
  const filters = [];

  const render = function () {
    const thisBook = this;

    for (const book of dataSource.books) {
      // generate html about data of data books
      const generatedHTML = templates.bookProduct(book);

      // generate element DOM of generated HTML
      thisBook.book = utils.createDOMFromHTML(generatedHTML);

      const bookContainer = document.querySelector(select.containerOf.bookList);
      bookContainer.appendChild(thisBook.book);
    }
  };

  render();

  const initActions = function () {
    const thisFavorite = this;

    thisFavorite.bookList = document.querySelector(select.containerOf.bookList);
    thisFavorite.bookImages = thisFavorite.bookList.querySelectorAll(
      select.elements.bookImage
    );

    thisFavorite.filteredBook = document.querySelector(select.filters.filter);

    for (let bookImage of thisFavorite.bookImages) {
      bookImage.addEventListener('dblclick', (event) => {
        if (
          event.target.offsetParent.classList.contains(
            select.elements.bookImage
          )
        ) {
          event.preventDefault();
        } else {
          bookImage.classList.toggle(className.bookFavorite);
          console.log('bookImage: ', bookImage);
          favoriteBooks.push(select.elements.dataId);
        }
      });
    }

    thisFavorite.filteredBook.addEventListener('click', (event) => {
      event.preventDefault();

      favoriteBooks.push(select.elements.dataId);
      if (event.target.type == 'checkbox') {
        if (event.target.checked == true) {
          filters.push(event.target.value);
        } else if (filters.includes(event.target.value)) {
          filters.splice(filters.indexOf(event.target.value));
        }
      }

      filterBooks();
    });
  };

  const filterBooks = function () {
    const bookId = [];

    for (let book in dataSource.books) {
      let shouldBeHidden = false;

      for (let filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          bookId.push(book.id);
          break;
        }
      }

      const bookImageElem = document.querySelector(
        '.book__image[data-id="id-of-the-book-here"]'
      );

      if (shouldBeHidden == true) {
        bookImageElem.classList.add(select.elements.hidden);
      } else if (shouldBeHidden == false) {
        bookImageElem.classList.remove(select.elements.hidden);
      }
    }
  };

  initActions();
}
