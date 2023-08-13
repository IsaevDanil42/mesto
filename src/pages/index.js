import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { initialCards, validationSettings, editBtn, addBtn, nameInput, profInput, elements } from '../components/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

const userInfo = new UserInfo('.profile__name', '.profile__profession');
const editFormValidator = new FormValidator(validationSettings, '#edit');
const addFormValidator = new FormValidator(validationSettings, '#add');

const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card({
      cardItem,
      handleCardClick: (name, link) => {
        const popupImage = new PopupWithImage('#image', name, link);
        popupImage.open();
        popupImage.setEventListeners();
      }
    },
    '#card'
    );
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }
},
elements
);

cardList.renderItems();

editBtn.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  profInput.value = profileInfo.about;
  const editForm = new PopupWithForm('#edit', {
    submitCallback: (e, inputValues) => {
      e.preventDefault();
      userInfo.setUserInfo(inputValues.name, inputValues.profession);
      editForm.close();
    }
  })
  editFormValidator.enableValidation();
  editForm.open();
  editForm.setEventListeners();
})

addBtn.addEventListener('click', () => {
  const addForm = new PopupWithForm('#add', {
    submitCallback: (e, inputValues) => {
      e.preventDefault();
      const card = new Card({
        cardItem: inputValues,
        handleCardClick: (name, link) => {
          const popupImage = new PopupWithImage('#image', name, link);
          popupImage.open();
          popupImage.setEventListeners();
        }
      },
      '#card'
      );
      cardList.addItem(card.createCard());
      addForm.close();
    }
  })
  addFormValidator.enableValidation();
  addForm.setEventListeners();
  addForm.open();
})


