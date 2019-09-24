export default class Form {
  constructor(target, db) {
    this.form = document.getElementById(target);
    this.target = target;
    this.db = db;
  }

  add(values) {
    this.db.addItem(values);
  }

  handleSubmit(e, self) {
    const { target } = e;
    const values = {
      author: target[0].value,
      year: target[1].value,
      title: target[2].value,
      pages: target[3].value
    };
    self.add(values);
    self.form.reset();
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
