import { pathOr } from "ramda";

export default class Item {
  constructor(values, db) {
    this.values = values;
    this.layout = `
      <span>
        <strong>Автор: </strong>
        <span class="books__author">${this.getValues(
        ["author"]
      )}</span>
      </span>
      <span>
        <strong>Год издания: </strong>
        <span class="books__year">${this.getValues(
        ["year"]
        )}</span>
      </span>
      <span>
        <strong>Название: </strong>
        <span class="books__name">${this.getValues(
        ["title"]
        )}</span>
      </span>
      <span>
        <strong>Количество страниц: </strong>
        <span class="books__count">${this.getValues(
        ["pages"]
        )}</span>
      </span>
      <span class="books__buttons"><span>
    `;
    this.deleteButton = document.createElement("button");
    this.editButton = document.createElement("button");
    this.db = db;
  }

  getValues(path) {
    return pathOr("null", ["bookValues", ...path], this.values);
  }

  handleDelete(self) {
    self.db.removeItem(self.getValues(['id']));
  }

  handleEdit(self) {
    self.db.setUpdate(self.getValues(['id']));
  }

  render(target) {
    this.deleteButton.classList.add("del");
    this.editButton.classList.add("edit");

    this.deleteButton.innerText = "Удалить";
    this.editButton.innerText = "Редактировать";

    this.deleteButton.addEventListener("click", () => this.handleDelete(this));
    this.editButton.addEventListener("click", () => this.handleEdit(this));

    const li = document.createElement("li");
    li.classList.add("books__item");
    li.innerHTML = this.layout;

    li.querySelector('.books__buttons').append(this.deleteButton);
    li.querySelector('.books__buttons').append(this.editButton);

    target.append(li);
  }
}
