import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { initialCards, validationSettings, editBtn, addBtn, nameInput, profInput, cardsContainer } from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

const cardsSection = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    cardsSection.addItem(createCard(cardItem));
  }
},
cardsContainer
);
const userInfo = new UserInfo('.profile__name', '.profile__profession');
const editFormValidator = new FormValidator(validationSettings, '#edit');
const addFormValidator = new FormValidator(validationSettings, '#add');
const editForm = new PopupWithForm(
  '#edit',
  {
    submitCallback: (e, inputValues) => {
      userInfo.setUserInfo(inputValues.name, inputValues.profession);
      editForm.close();
    }
  });
const addForm = new PopupWithForm(
  '#add',
  {
    submitCallback: (e, inputValues) => {
      cardsSection.addItem(createCard(inputValues));
      addForm.close();
    }
  }
);
const popupImage = new PopupWithImage('#image');
editFormValidator.enableValidation();
addFormValidator.enableValidation();
editForm.setEventListeners();
addForm.setEventListeners();
popupImage.setEventListeners();


cardsSection.renderItems();

editBtn.addEventListener('click', handleEditForm)

addBtn.addEventListener('click', handleAddForm)

function createCard(cardItem) {
  const card = new Card({
    cardItem,
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
    }
  },'#card');

  return card.createCard();
}

function handleAddForm() {
  addForm.open();
}

function handleEditForm() {
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  profInput.value = profileInfo.about;
  editForm.open();
}


