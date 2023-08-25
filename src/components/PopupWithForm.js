import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  #submitCallback;
  #disableButton;
  #form;
  #inputValues;
  #bindedSubmitEvent;
  #imputList;
  constructor(popupSelector, { submitCallback, disableButton }) {
    super(popupSelector);
    this.#submitCallback = submitCallback;
    this.#disableButton = disableButton;
    this.#form = this._popupElement.querySelector('.popup__form');
    this.#bindedSubmitEvent = this.#handleEvent.bind(this);
    this.#imputList = Array.from(this._popupElement.querySelectorAll('.popup__input'));
  }

  #getInputValues() {
    const inputValues = {}
    this.#imputList.forEach((input) => {
      inputValues[input.id.replace("place-","").replace("avatar-","")] = input.value;
    })

    return inputValues;
  }

  #handleEvent(e) {
    e.preventDefault();
    this.#inputValues = this.#getInputValues();
    this.#submitCallback(e, this.#inputValues);
  }

  setEventListeners() {
    super.setEventListeners();
    this.#form.addEventListener('submit', this.#bindedSubmitEvent);
  }

  close() {
    super.close();
    this.#form.reset();
    this.#disableButton()
  }
}
