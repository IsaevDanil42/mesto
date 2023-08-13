export default class Popup {
  #closeButton;
  #bindedKeydowListener;
  #bindedButtonListener;
  #bindedOverlayListener;
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this.#bindedKeydowListener = this.#handleEcsClose.bind(this);
    this.#bindedButtonListener = this.close.bind(this);
    this.#bindedOverlayListener = this.#handleOverlayClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    this.removeEventListeners();
  }

  #handleEcsClose(e) {
    if(e.key === 'Escape') {
      this.close();
  }}

  #handleOverlayClose(e) {
    if(e.target.className.includes('popup_opened')) {
      this.close();
    }
  }

  setEventListeners() {
    window.addEventListener('keydown', this.#bindedKeydowListener)
    this.#closeButton = this._popupElement.querySelector('.popup__close-btn');
    this.#closeButton.addEventListener('click', this.#bindedButtonListener)
    this._popupElement.addEventListener('click', this.#bindedOverlayListener)
  }

  removeEventListeners() {
    window.removeEventListener('keydown', this.#bindedKeydowListener)
    this.#closeButton.removeEventListener('click', this.#bindedButtonListener)
    this._popupElement.removeEventListener('click', this.#bindedOverlayListener)
  }
}
