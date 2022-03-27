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
      bookImage.ratingBgc = determineRatingBgc(bookImage.rating);
      bookImage.ratingWidth = bookImage.rating * 100;

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
      favoriteBooks.push(select.elements.dataId);
      if (event.target.type == 'checkbox') {
        if (event.target.checked == true) {
          filters.push(event.target.value);
        } else if (filters.includes(event.target.value)) {
          filters.splice(filters.indexOf(event.target.value), 1);
        }
      }

      filterBooks();
    });
  };

  const filterBooks = function () {
    const bookId = [];

    for (let book of dataSource.books) {
      let shouldBeHidden = false;

      for (let filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          bookId.push(book.id);
          break;
        }
      }

      const bookImageElem = document.querySelector(
        '[data-id="' + book.id + '"]'
      );

      if (shouldBeHidden == true) {
        bookImageElem.classList.add(select.elements.hidden);
      } else if (shouldBeHidden == false) {
        bookImageElem.classList.remove(select.elements.hidden);
      }
    }
  };

  initActions();

  const determineRatingBgc = function (rating) {
    let ratingBgc = '';

    if (rating < 6) {
      ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
    } else if (rating > 6 && rating <= 8) {
      ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return ratingBgc;
  };
}
