export default class FormValidator {
  #inputSelector;
  #submitButtonSelector;
  #inactiveButtonClass;
  #inputErrorClass;
  #errorClass;
  #formElement;
  #inputList;
  #buttonElement;
  constructor(settings, formElement) {
    this.#inputSelector = settings.inputSelector;
    this.#submitButtonSelector = settings.submitButtonSelector;
    this.#inactiveButtonClass = settings.inactiveButtonClass;
    this.#inputErrorClass = settings.inputErrorClass;
    this.#errorClass = settings.errorClass;
    this.#formElement = formElement;
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

  #toogleButtonState() {
    if(this.#hasInvalidInput()) {
      this.#buttonElement.classList.add(this.#inactiveButtonClass);
      this.#buttonElement.disabled = true;
    } else {
      this.#buttonElement.classList.remove(this.#inactiveButtonClass);
      this.#buttonElement.disabled = false;
    }
  };

  #setEventListeners() {
    this.#inputList = Array.from(this.#formElement.querySelectorAll(this.#inputSelector));
    this.#buttonElement = this.#formElement.querySelector(this.#submitButtonSelector);

    this.#toogleButtonState();
    this.#inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.#isValid(inputElement);
        this.#toogleButtonState();
      })
    });
    this.#formElement.addEventListener('submit', () => {
      this.#toogleButtonState();
    })
  }

  enableValidation() {
    this.#setEventListeners();
  }
}
