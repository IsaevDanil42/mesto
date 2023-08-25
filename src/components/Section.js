export default class Section {
  #renderer;
  #container;
  constructor({ renderer }, container) {
    this.#renderer = renderer;
    this.#container = container;
  }

  renderItems(items) {
    items.forEach(item => this.#renderer(item));
  }

  addItem(element) {
    this.#container.prepend(element);
  }
}
