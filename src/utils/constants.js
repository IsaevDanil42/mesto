import iceland from '../images/iceland.jpg';
import newZealand from '../images/new-zealand.jpg'
import italy from '../images/italy.jpg'
import indonesia from '../images/indonesia.jpg'
import canada from '../images/canada.jpg'
import norway from '../images/norway.jpg'

export const initialCards = [
  {
    name:'Исладния',
    link:iceland
  },
  {
    name:'Новая Зеландия',
    link:newZealand
  },
  {
    name:'Италия',
    link:italy
  },
  {
    name:'Индонезия',
    link:indonesia
  },
  {
    name:'Канада',
    link:canada
  },
  {
    name:'Норвегия',
    link:norway
  }
];

export const validationSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const editBtn = document.querySelector('.profile__edit-btn');
export const addBtn = document.querySelector('.profile__add-btn');
export const nameInput = document.querySelector('#name');
export const profInput = document.querySelector('#profession');
export const cardsContainer = document.querySelector('.elements');
