export default class Item {
  constructor(values) {
    this.values = values;
    this.layout = `
      <span><strong>Автор: </strong><span class="books__author">${this.values.author}</span></span>
      <span><strong>Год издания: </strong><span class="books__year">${this.values.year}</span></span>
      <span><strong>Название: </strong><span class="books__name">${this.values.name}</span></span>
      <span><strong>Количество страниц: </strong><span class="books__count">${this.values.count}</span></span>
      <button class="del">Удалить</button>
      <button class="edit">Редактировать</button>
    `;
  }

  render(target) {
    const li = document.createElement("li");
    li.innerHTML = this.layout;
    debugger;
    target.append(li);
  }
}
