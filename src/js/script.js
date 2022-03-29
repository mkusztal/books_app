('use strict');

class BooksList {
  constructor() {
    const thisBook = this;

    thisBook.initData();
    thisBook.getElements();
    thisBook.initActions();
    thisBook.filterBooks();
    thisBook.determineRatingBgc();

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
      className: {
        bookFavorite: 'favorite',
      },
    };

    // set up templated that compline from select object
    thisBook.templates = {
      bookProduct: Handlebars.compile(
        document.querySelector(select.templateOf.bookProduct).innerHTML
      ),
    };

    thisBook.favoriteBooks = [];
    thisBook.filters = [];
  }

  initData() {
    this.data = dataSource.books;
  }

  getElements() {
    const thisBook = this;

    thisBook.dom = {
      bookProduct: document.querySelector(
        thisBook.select.templateOf.bookProduct
      ),
      bookList: document.querySelector(thisBook.select.containerOf.bookList),
      bookImages: document.querySelectorAll(thisBook.select.elements.bookImage),
      bookDataId: document.querySelector(thisBook.select.elements.dataId),
      bookHidden: document.querySelector(thisBook.select.elements.hidden),
      bookFilter: document.querySelector(thisBook.select.filters.filter),
      bookFilterValue: document.querySelector(
        thisBook.select.filters.filtersValue
      ),
      bookFavorite: document.querySelector(
        thisBook.select.className.bookFavorite
      ),
    };
  }

  render() {
    const thisBook = this;

    for (const book of dataSource.books) {
      book.ratingBgc = thisBook.determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;

      // generate html about data of data books
      const generatedHTML = thisBook.templates.bookProduct(book);

      // generate element DOM of generated HTML
      thisBook.book = utils.createDOMFromHTML(generatedHTML);

      //const bookContainer = document.querySelector(select.containerOf.bookList);
      thisBook.dom.bookList.appendChild(thisBook.book);
    }
  }

  initActions() {
    const thisBook = this;

    for (let bookImage of thisBook.dom.bookImages) {
      bookImage.addEventListener('dblclick', (event) => {
        if (
          event.target.offsetParent.classList.contains(
            thisBook.select.elements.bookImage
          )
        ) {
          event.preventDefault();
        } else {
          bookImage.classList.toggle(thisBook.select.className.bookFavorite);
          console.log('bookImage: ', bookImage);
          thisBook.favoriteBooks.push(thisBook.select.elements.dataId);
        }
      });
    }

    thisBook.dom.bookFilter.addEventListener('click', (event) => {
      thisBook.favoriteBooks.push(thisBook.select.elements.dataId);
      if (event.target.type == 'checkbox') {
        if (event.target.checked == true) {
          thisBook.filters.push(event.target.value);
        } else if (thisBook.filters.includes(event.target.value)) {
          thisBook.filters.splice(
            thisBook.filters.indexOf(event.target.value),
            1
          );
        }
      }

      thisBook.filterBooks();
    });
  }

  filterBooks() {
    const thisBook = this;
    const bookId = [];

    for (let book of dataSource.books) {
      let shouldBeHidden = false;

      for (let filter of thisBook.filters) {
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
        bookImageElem.classList.add(thisBook.select.elements.hidden);
      } else if (shouldBeHidden == false) {
        bookImageElem.classList.remove(thisBook.select.elements.hidden);
      }
    }
  }

  determineRatingBgc(rating) {
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
  }
}

// eslint-disable-next-line no-unused-vars
const app = new BooksList();
