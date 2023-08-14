import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  #image;
  #imageSubtitle;
  constructor(popupSelector) {
    super(popupSelector);
    this.#image = this._popupElement.querySelector('.popup__image');
    this.#imageSubtitle = this._popupElement.querySelector('.popup__subtitle');
  }

  open(name, link) {
    super.open();
    this.#image.alt = name;
    this.#image.src = link;
    this.#imageSubtitle.textContent = name;
  }
}
