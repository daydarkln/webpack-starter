import { pathOr } from "ramda";

export default class Form {
  constructor(target, db) {
    this.form = document.getElementById(target);
    this.target = target;
    this.db = db;
  }

  add(values) {
    this.db.addItem(values);
  }

  update(values) {
    this.db.updateItem(this.updateItemId, values);
  }

  handleSubmit(e, self) {
    const { target } = e;
    const values = {
      author: target[0].value,
      year: target[1].value,
      title: target[2].value,
      pages: target[3].value
    };

    const isSetUpdate = self.db.getByKey("isFormUpdate", false);

    if (isSetUpdate) {
      self.update({ id: this.updateItemId, ...values });
    } else {
      self.add(values);
    }
    self.form.reset();
  }

  getValues(path, values) {
    return pathOr("null", ["bookValues", ...path], values);
  }

  setItems(values) {
    this.updateItemId = this.getValues(["id"], values);
    this.form[0].value = this.getValues(["author"], values);
    this.form[1].value = this.getValues(["year"], values);
    this.form[2].value = this.getValues(["title"], values);
    this.form[3].value = this.getValues(["pages"], values);
  }

  start() {
    // document.addEventListener("storage", this.render);
    const self = this;
    this.form.addEventListener("submit", function(e) {
      e.preventDefault();
      self.handleSubmit(e, self);
    });
  }
}
