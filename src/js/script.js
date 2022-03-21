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
      bookImage: '.book-image',
      dataId: 'data-id',
    },
    class: {
      favorite: 'favourite',
    },
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

    thisFavorite.bookList.addEventListener('dclick', function (event) {
      event.preventDefault();

      favoriteBooks.push(select.elements.dataId);
    });
  };
}
