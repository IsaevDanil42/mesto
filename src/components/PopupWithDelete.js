import Popup from "./Popup";

export default class PopupWithDelete extends Popup {
  #submitCallback;
  #form;
  #bindedSubmitEvent;
  constructor(popupSelector, { submitCallback }) {
    super(popupSelector);
    this.#submitCallback = submitCallback;
    this.#form = this._popupElement.querySelector('.popup__form');
    this.#bindedSubmitEvent = this.#handleEvent.bind(this);
  }

  #handleEvent(e) {
    e.preventDefault();
    this.#submitCallback(e, this.cardId, this.element);
  }

  setEventListeners() {
    super.setEventListeners();
    this.#form.addEventListener('submit', this.#bindedSubmitEvent);
  }

  open(cardId, element) {
    super.open();
    this.cardId = cardId;
    this.element = element;
  }
}
