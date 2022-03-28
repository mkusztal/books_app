class BooksList{
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
    }
  };

  // set up templated that compline from select object
   templates = {
    bookProduct: Handlebars.compile(
      document.querySelector(select.templateOf.bookProduct).innerHTML
    ),
    bookList: Handlebars.compile(
      document.querySelector(select.containerOf.bookList).innerHTML
    ),
  };

  favoriteBooks = [];
  filters = [];

  getElements(){
    const thisBook = this;

    thisBook.dom = {
      bookProduct: document.querySelector(select.templateOf.bookProduct),
      bookList: document.querySelector(select.containerOf.bookList),
      bookImages: document.querySelectorAll(select.elements.bookImage),
      bookDataId: document.querySelector(select.elements.dataId),
      bookHidden: document.querySelector(select.elements.hidden),
      bookFilter: document.querySelector(select.filters.filter),
      bookFilterValue: document.querySelector(select.filters.filtersValue),
      bookFavorite: document.querySelector(select.className.bookFavorite),
    }
  }

  render = function () {
    const thisBook = this;

    for (const book of dataSource.books) {
      book.ratingBgc = determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;

      // generate html about data of data books
      const generatedHTML = templates.bookProduct(book);

      // generate element DOM of generated HTML
      thisBook.book = utils.createDOMFromHTML(generatedHTML);

      //const bookContainer = document.querySelector(select.containerOf.bookList);
      thisBook.dom.bookList.appendChild(thisBook.book);
    }
  };

  initActions = function () {
    const thisFavorite = this;

    //thisFavorite.bookList = document.querySelector(select.containerOf.bookList);
    //thisFavorite.bookImages = thisFavorite.dom.bookList.querySelectorAll(
    //  select.elements.bookImage
    //);

    //thisFavorite.filteredBook = document.querySelector(select.filters.filter);

    for (let bookImage of thisFavorite.dom.bookImages) {
      bookImage.addEventListener('dblclick', (event) => {
        if (
          event.target.offsetParent.classList.contains(
            select.elements.bookImage
          )
        ) {
          event.preventDefault();
        } else {
          bookImage.classList.toggle(select.className.bookFavorite);
          console.log('bookImage: ', bookImage);
          favoriteBooks.push(select.elements.dataId);
        }
      });
    }

    thisFavorite.dom.bookFilter.addEventListener('click', (event) => {
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

  filterBooks = function () {
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

  determineRatingBgc = function (rating) {
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

  render();
  initActions();
}
