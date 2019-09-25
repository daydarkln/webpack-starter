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

  drop() {
    this.target.querySelector("ul").remove();
  }

  render() {
    const list = document.createElement("ul");
    list.classList.add("book__list");
    this.target.append(list);

    const books = this.db.getByKey("bookList", []);
    books.map(book => {
      const bookItem = new Item(book, this.db);
      bookItem.render(list);
    });
  }

  start() {
    this.render();
  }
}
