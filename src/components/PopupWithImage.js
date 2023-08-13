import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  #name;
  #link;
  constructor(popupSelector, name, link) {
    super(popupSelector);
    this.#name = name;
    this.#link = link;
  }

  open() {
    super.open();
    this._popupElement.querySelector('.popup__image').alt = this.#name;
    this._popupElement.querySelector('.popup__image').src = this.#link;
    this._popupElement.querySelector('.popup__subtitle').textContent = this.#name;
  }
}
