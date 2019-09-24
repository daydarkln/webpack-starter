export default class LocalStorageController {
  constructor() {
    this.storage = window.localStorage;
  }

  getByKey(key, defaultValue) {
    const result = JSON.parse(this.storage.getItem(key));
    if (result) {
      return result;
    }
    return defaultValue;
  }

  postItem(values) {
    this.storage.setItem("bookList", JSON.stringify(values));
  }

  addItem(values) {
    const list = this.getByKey("bookList", []);
    this.postItem([values, ...list]);
  }

  setUpdate(id) {
    const list = this.getByKey("bookList");
  }

  updateItem(id, values) {}
}
