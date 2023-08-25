import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
// import { initialCards, validationSettings, editBtn, addBtn, nameInput, profInput, cardsContainer } from '../utils/constants.js';
import { validationSettings, editBtn, addBtn, nameInput, profInput, cardsContainer, profileAvatar } from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
import PopupWithDelete from '../components/PopupWithDelete.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-73',
  headers: {
    authorization: '77f03978-6dde-466c-bc25-400409d54388',
    'Content-Type': 'application/json'
  }
});

const cardsSection = new Section({
  renderer: (cardItem) => {
    cardsSection.addItem(createCard(cardItem));
  }
},
cardsContainer
);
const userInfo = new UserInfo('.profile__name', '.profile__profession', '.profile__avatar');
const editFormValidator = new FormValidator(validationSettings, '#edit');
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(validationSettings, '#add');
addFormValidator.enableValidation();
const updateAvatarValidator = new FormValidator(validationSettings, '#avatar');
updateAvatarValidator.enableValidation();
const editForm = new PopupWithForm(
  '#edit',
  {
    submitCallback: (e, inputValues) => {
      const submitBtn = document.querySelector('#edit').querySelector('.popup__submit-btn');
      submitBtn.textContent = 'Сохранение...';
      api.editProfile(inputValues.name, inputValues.profession)
        .then((userData) => {
          userInfo.setUserInfo(userData.name, userData.about);
          editForm.close();
        })
        .catch((err) => console.log(err))
        .finally(() => submitBtn.textContent = 'Сохраненить')
    },
    disableButton: () => {
      editFormValidator.disableButton()
    }
  });
const addForm = new PopupWithForm(
  '#add',
  {
    submitCallback: (e, inputValues) => {
      const submitBtn = document.querySelector('#add').querySelector('.popup__submit-btn');
      submitBtn.textContent = 'Создание...';
      api.addCard(inputValues.name, inputValues.link)
        .then((card) => {
          cardsSection.addItem(createCard(card));
          addForm.close();
        })
        .catch((err) => console.log(err))
        .finally(() => submitBtn.textContent = 'Создать')
    },
    disableButton: () => {
      addFormValidator.disableButton()
    }
  }
);
const deleteForm = new PopupWithDelete(
  '#delete',
  {
    submitCallback: (e, cardId, element) => {
      api.deleteCard(cardId)
        .then(() => {
          element.remove();
          deleteForm.close();
        })
        .catch((err) => console.log(err))
    }
  }
)
const updateAvatarForm = new PopupWithForm(
  '#avatar',
  {
    submitCallback: (e, inputValues) => {
      const submitBtn = document.querySelector('#avatar').querySelector('.popup__submit-btn');
      submitBtn.textContent = 'Сохранение...';
      api.updateAvatar(inputValues.link)
      .then(() => {
        userInfo.setUserAvatar(inputValues.link);
        updateAvatarForm.close();
      })
      .catch((err) => console.log(err))
      .finally(() => submitBtn.textContent = 'Сохраненить')
    },
    disableButton: () => {
      updateAvatarValidator.disableButton()
    }
  }
)
const popupImage = new PopupWithImage('#image');
editForm.setEventListeners();
addForm.setEventListeners();
deleteForm.setEventListeners();
updateAvatarForm.setEventListeners();
popupImage.setEventListeners();


api.getInitialCards()
  .then((initialCards) => {cardsSection.renderItems(initialCards)})
  .catch((err) => console.log(err))

api.getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
  })
  .catch((err) => console.log(err))

editBtn.addEventListener('click', handleEditForm);

addBtn.addEventListener('click', handleAddForm);

profileAvatar.addEventListener('click', handleAvatarForm);

function createCard(cardItem) {
  const card = new Card({
    cardItem,
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
    },
    handleDeleteClick: (cardId, element) => {
      deleteForm.open(cardId, element);
    },
    handleAddLike: (cardId) => {
      return api.addLike(cardId);
    },
    handleRemoveLike: (cardId) => {
      return api.removeLike(cardId);
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

function handleAvatarForm() {
  updateAvatarForm.open();
}


