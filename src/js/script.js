{
  ('use strict');

  // reference to template of 'template-book' and list 'book-list'
  const select = {
    template: {
      bookProduct: '#template-book',
    },
    container: {
      bookList: '#book-list',
    },
  };

  // set up templated that compline from select object
  const templates = {
    product: Handlerbars.compile(
      document.querySelector(select.template.bookProduct).innerHTML
    ),
  };

  function render() {
    const thisBook = this;

    let dataBooks = thisBook.dataSource.books;

    for (const book of dataBooks) {
      // search elements of 'dataSource.books'
      const books = dataBooks[book];

      // generate html about data of data books
      const generatedHTML = templates.product(dataBooks);

      // generate element DOM of generated HTML
      thisBook.book = utils.createDOMFromHTML(generatedHTML);

      const bookContainer = document.querySelector(select.container.bookList);
      bookContainer.appendChild(thisBook.book);
    }

    render();
  }
}
