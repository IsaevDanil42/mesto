import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  #submitCallback;
  #form;
  #inputValues;
  #bindedSubmitEvent;
  constructor(popupSelector, { submitCallback }) {
    super(popupSelector);
    this.#submitCallback = submitCallback;
    this.#form = this._popupElement.querySelector('.popup__form');
    this.#bindedSubmitEvent = this.#submitEvent.bind(this);
  }

  #getInputValues() {
    const inputValues = {}
    Array.from(this._popupElement.querySelectorAll('.popup__input')).forEach((input) => {
      inputValues[input.id.replace("-","")] = input.value;
    })

    return inputValues;
  }

  #submitEvent(e) {
    this.#inputValues = this.#getInputValues();
    this.#submitCallback(e, this.#inputValues);
  }

  setEventListeners() {
    super.setEventListeners();
    this.#form.addEventListener('submit', this.#bindedSubmitEvent);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this.#form.removeEventListener('submit', this.#bindedSubmitEvent);
  }

  close() {
    super.close();
    this.#form.reset();
  }
}
