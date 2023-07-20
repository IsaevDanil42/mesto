import Card from './Card.js';
import FormValidator from './FormValidator.js';
const editPopup = document.querySelector('#edit');
export const imagePopup = document.querySelector('#image');
const addPopup = document.querySelector('#add');
const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');
const nameProfile = document.querySelector('.profile__name');
const profProfile = document.querySelector('.profile__profession');
const editForm = document.querySelector('#edit-form');
const addForm = document.querySelector('#add-form');
const nameInput = document.querySelector('#name');
const profInput = document.querySelector('#profession');
const titleInput = document.querySelector('#place-name');
const linkInput = document.querySelector('#link');
const closeBtns = document.querySelectorAll('.popup__close-btn');
const elements = document.querySelector('.elements');
const formList = Array.from(document.querySelectorAll('.popup__form'));
const initialCards = [
  {
    name:'Исладния',
    link:'./images/iceland.jpg'
  },
  {
    name:'Новая Зеландия',
    link:'./images/new-zealand.jpg'
  },
  {
    name:'Италия',
    link:'./images/italy.jpg'
  },
  {
    name:'Индонезия',
    link:'./images/indonesia.jpg'
  },
  {
    name:'Канада',
    link:'./images/canada.jpg'
  },
  {
    name:'Норвегия',
    link:'./images/norway.jpg'
  }
];
const validationSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

initialCards.forEach((item) => {
  const card = new Card(item, '#card');
  renderCard(card.createCard());
});

formList.forEach((formElement) => {
  const form = new FormValidator(validationSettings, formElement);
  form.enableValidation();
})

closeBtns.forEach(button => {
  const openedPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(openedPopup));
});

editBtn.addEventListener('click', function(){
  nameInput.value = nameProfile.textContent;
  profInput.value = profProfile.textContent;
  openPopup(editPopup);
})

addBtn.addEventListener('click', () => {
  openPopup(addPopup);
});

editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  nameProfile.textContent = nameInput.value;
  profProfile.textContent = profInput.value;
  closePopup(editPopup);
});

addForm.addEventListener('submit', (e) =>{
  e.preventDefault();
  const cardObj = {name:titleInput.value, link:linkInput.value};
  const card = new Card(cardObj, '#card');
  renderCard(card.createCard());
  titleInput.value = '';
  linkInput.value = '';
  closePopup(addPopup);
});

function closeKey(e) {
  if(e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closeByOverlay(e) {
  if(e.target.className.includes('popup_opened')) {
    closePopup(e.target);
  }
};

export function openPopup(elem) {
  elem.classList.add('popup_opened');
  window.addEventListener('keydown', closeKey);
  elem.addEventListener('click', closeByOverlay);
};

function closePopup(elem) {
  elem.classList.remove('popup_opened');
  window.removeEventListener('keydown', closeKey);
  elem.removeEventListener('click', closeByOverlay);
};

function renderCard(cardElement) {
  elements.prepend(cardElement);
};
