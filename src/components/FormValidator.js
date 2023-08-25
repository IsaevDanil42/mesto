export default class FormValidator {
  #inputSelector;
  #submitButtonSelector;
  #inactiveButtonClass;
  #inputErrorClass;
  #errorClass;
  #formElement;
  #inputList;
  #buttonElement;
  constructor(settings, formSelector) {
    this.#inputSelector = settings.inputSelector;
    this.#submitButtonSelector = settings.submitButtonSelector;
    this.#inactiveButtonClass = settings.inactiveButtonClass;
    this.#inputErrorClass = settings.inputErrorClass;
    this.#errorClass = settings.errorClass;
    this.#formElement = document.querySelector(formSelector);
  }

  #showInputError(inputElement, errorMessage) {
    const errorElement = this.#formElement.querySelector(`.popup__${inputElement.id}`);

    inputElement.classList.add(this.#inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.#errorClass);
  };

  #hideInputError(inputElement) {
    const errorElement = this.#formElement.querySelector(`.popup__${inputElement.id}`);

    inputElement.classList.remove(this.#inputErrorClass);
    errorElement.classList.remove(this.#errorClass);
    errorElement.textContent = '';
  };

  #isValid(inputElement) {
    if(!inputElement.validity.valid) {
      this.#showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.#hideInputError(inputElement);
    }
  };

 #hasInvalidInput() {
    return this.#inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  #toggleButtonState() {
    if(this.#hasInvalidInput()) {
      this.disableButton();
    } else {
      this.#buttonElement.classList.remove(this.#inactiveButtonClass);
      this.#buttonElement.disabled = false;
    }
  };

  disableButton() {
    this.#buttonElement.classList.add(this.#inactiveButtonClass);
    this.#buttonElement.disabled = true;
  }

  #setEventListeners() {
    this.#inputList = Array.from(this.#formElement.querySelectorAll(this.#inputSelector));
    this.#buttonElement = this.#formElement.querySelector(this.#submitButtonSelector);


    this.#toggleButtonState();
    this.#inputList.forEach((inputElement) => {
      this.#isValid(inputElement);
      inputElement.addEventListener('input', () => {
        this.#isValid(inputElement);
        this.#toggleButtonState();
      })
    });
    this.#formElement.addEventListener('submit', () => {
      this.disableButton();
    })
  }

  enableValidation() {
    this.#setEventListeners();
  }
}
