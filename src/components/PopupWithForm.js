import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  #submitCallback;
  #disableButton;
  #form;
  #submitBtn;
  #submitBtnText;
  #inputValues;
  #bindedSubmitEvent;
  #imputList;
  constructor(popupSelector, { submitCallback, disableButton }) {
    super(popupSelector);
    this.#submitCallback = submitCallback;
    this.#disableButton = disableButton;
    this.#form = this._popupElement.querySelector('.popup__form');
    this.#submitBtn = this.#form.querySelector('.popup__submit-btn');
    this.#submitBtnText = this.#submitBtn.textContent;
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

  renderLoading(isLoading, loadingText='Сохранение...') {
    if(isLoading) {
      this.#submitBtn.textContent = loadingText;
    } else {
      this.#submitBtn.textContent = this.#submitBtnText;
    }
  }

  close() {
    super.close();
    this.#form.reset();
    this.#disableButton()
  }
}
