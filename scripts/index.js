const editPopup = document.querySelector('#edit');
const imagePopup = document.querySelector('#image');
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
const cardTemplate = document.querySelector('#card').content;
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

initialCards.forEach((item) => {
  renderCard(item);
});

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
  renderCard(cardObj);
  titleInput.value = '';
  linkInput.value = '';
  closePopup(addPopup);
});

function createCard(cardData) {
  const cardElements = cardTemplate.querySelector('.elements__card').cloneNode(true);

  cardElements.querySelector('.elements__delete-btn').addEventListener('click', () => cardElements.closest('.elements__card').remove());
  cardElements.querySelector('.elements__like').addEventListener('click', (e) => e.target.classList.toggle('elements__like_active'));
  cardElements.querySelector('.elements__photo').addEventListener('click', () => {
    imagePopup.querySelector('.popup__image').src = cardData.link;
    imagePopup.querySelector('.popup__image').alt = cardData.name;
    imagePopup.querySelector('.popup__subtitle').textContent = cardData.name;
    openPopup(imagePopup);
  });

  cardElements.querySelector('.elements__photo').src = cardData.link;
  cardElements.querySelector('.elements__photo').alt = cardData.name;
  cardElements.querySelector('.elements__title').textContent = cardData.name;

  return cardElements;
};

function renderCard(cardData) {
  elements.prepend(createCard(cardData));
}

function closeKey(e) {
  const openedPopup = document.querySelector('.popup_opened');
  if(e.key === 'Escape') {
    closePopup(openedPopup);
  }
}

function closeByOverlay(e) {
  if(e.target.className.includes('popup_opened')) {
    closePopup(e.target);
  }
};

function openPopup(elem) {
  elem.classList.add('popup_opened');
  window.addEventListener('keydown', closeKey);
  elem.addEventListener('click', closeByOverlay);
};

function closePopup(elem) {
  elem.classList.remove('popup_opened');
  window.removeEventListener('keydown', closeKey);
  elem.removeEventListener('click', closeByOverlay);
};


