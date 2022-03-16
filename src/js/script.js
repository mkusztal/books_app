{
  ('use strict');

  // reference to template of 'template-book' and list 'book-list'
  const select = {
    templateOf: {
      bookProduct: '#template-book',
    },
    containerOf: {
      bookList: '#book-list',
    },
  };

  // set up templated that compline from select object
  const templates = {
    menuProduct: Handlerbars.compile(
      document.querySelector(select.templateOf.bookProduct).innerHTML
    ),
  };

  function render() {
    const thisBook = this;

    let dataBooks = thisBook.dataSource.books;

    for (const book of dataBooks) {
      // search elements of 'dataSource.books'
      const books = dataBooks[book];
      console.log(books);

      // generate html about data of data books
      const generatedHTML = templates.product(books);

      // generate element DOM of generated HTML
      thisBook.book = utils.createDOMFromHTML(generatedHTML);

      const bookContainer = document.querySelector(select.containerOf.bookList);
      bookContainer.appendChild(thisBook.book);
    }
  }

  render();
}
