import Item from "./Item";

export default class List {
  constructor(target, db, form) {
    this.target = document.getElementById(target);
    this.db = db;
    this.form = form;
  }

  update(id) {
    this.db.updateItem(id);
  }

  delete(id) {
    this.db.deleteItem(id);
  }

  render() {
    debugger;
    const list = document.createElement("ul");
    this.target.append(list);

    const books = this.db.getByKey("bookList", []);
    books.map(book => {
      const bookItem = new Item(book);
      bookItem.render(list);
    });
  }

  start() {
    this.render();
    window.addEventListener("storage", function() {
      console.log("storage updated");
      this.render();
    });
  }
}
