import uuidv1 from "uuid/v1";
import { compose, when, map, pathEq, assoc, pathOr } from "ramda";

export default class LocalStorageController {
  constructor() {
    this.storage = window.localStorage;
    this.list = null;
  }

  getByKey(key, defaultValue) {
    const result = JSON.parse(this.storage.getItem(key));
    if (result) {
      return result;
    }
    return defaultValue;
  }

  setIsUpdate(value) {
    this.storage.setItem("isFormUpdate", JSON.stringify(value));
  }

  postItem(values) {
    this.storage.setItem("bookList", JSON.stringify(values));
  }

  postToForm(book) {
    this.storage.setItem("formData", JSON.stringify(book));
    this.setIsUpdate(true);
  }

  addItem(values) {
    const list = this.getByKey("bookList", []);
    this.postItem([{ bookValues: { id: uuidv1(), ...values } }, ...list]);
    this.list.drop();
    this.list.render();
  }

  removeItem(id) {
    const bookList = this.getByKey("bookList", []);
    this.postItem(
      bookList.filter(item => pathOr("", ["bookValues", "id"], item) !== id)
    );
    this.list.drop();
    this.list.render();
  }

  setUpdate(id) {
    const list = this.getByKey("bookList", []);
    const book = list.find(
      item => pathOr("", ["bookValues", "id"], item) === id
    );
    this.postToForm(book);
    this.form.setItems(book);
  }

  updateItem(id, values) {
    const list = this.getByKey("bookList", []);
    const updatedList = compose(
      map(when(pathEq(["bookValues", "id"], id), assoc("bookValues", values)))
    )(list);
    this.postItem(updatedList);
    this.setIsUpdate(false);
    this.list.drop();
    this.list.render();
  }

  start(list, form) {
    this.list = list;
    this.form = form;
  }
}
