function showInputError(formElement, inputElement, errorMessage, elementSettings) {
  const errorElement = formElement.querySelector(`.popup__${inputElement.id}`);

  inputElement.classList.add(elementSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(elementSettings.errorClass);
};

function hideInputError(formElement, inputElement, elementSettings) {
  const errorElement = formElement.querySelector(`.popup__${inputElement.id}`);

  inputElement.classList.remove(elementSettings.inputErrorClass);
  errorElement.classList.remove(elementSettings.errorClass);
  errorElement.textContent = '';
};

function isValid(formElement, inputElement, elementSettings) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, elementSettings);
  } else {
    hideInputError(formElement, inputElement, elementSettings);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toogleButtonState(inputList, buttonElement, elementSettings) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(elementSettings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(elementSettings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

function setEventListeners(formElement, elementSettings) {
  const inputList = Array.from(formElement.querySelectorAll(elementSettings.inputSelector));
  const buttonElement = formElement.querySelector(elementSettings.submitButtonSelector);

  toogleButtonState(inputList, buttonElement, elementSettings);


  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, elementSettings);
      toogleButtonState(inputList, buttonElement, elementSettings);
    })
  });
  formElement.addEventListener('submit', () => {
    toogleButtonState(inputList, buttonElement, elementSettings);
  });
};

function enableValidation(elementSettings) {
  const formList = Array.from(document.querySelectorAll(elementSettings.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, elementSettings);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
