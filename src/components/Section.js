export default class Section {
  #items;
  #renderer;
  #container;
  constructor({ items, renderer }, container) {
    this.#items = items;
    this.#renderer = renderer;
    this.#container = container;
  }

  renderItems() {
    this.#items.forEach(item => this.#renderer(item));
  }

  addItem(element) {
    this.#container.prepend(element);
  }
}
