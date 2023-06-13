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
const titleInput = document.querySelector('#title');
const linkInput = document.querySelector('#link');
const closeBtns = document.querySelectorAll('.popup__close-btn');
const elements = document.querySelector('.elements');
const initialCards = [
  {
    name:'Исладния',
    link:'./images/iceland.jpg',
    alt:'Береговая линия в Исладнии'
  },
  {
    name:'Новая Зеландия',
    link:'./images/new-zealand.jpg',
    alt:'Озеро в Новой Зеландии'
  },
  {
    name:'Италия',
    link:'./images/italy.jpg',
    alt:'Бухта в Италии'
  },
  {
    name:'Индонезия',
    link:'./images/indonesia.jpg',
    alt:'Вид на поля и гору в Индонезии'
  },
  {
    name:'Канада',
    link:'./images/canada.jpg',
    alt:'Канадские горы'
  },
  {
    name:'Норвегия',
    link:'./images/norway.jpg',
    alt:'Северное сияние и горы в Норвегии'
  }
];

initialCards.forEach((item) => {
  addCard(item.name, item.link, item.alt);
});

closeBtns.forEach((item) => {
  item.addEventListener('click', (e) => closePopup(e.target));
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
  closePopup(e.target);
});

addForm.addEventListener('submit', (e) =>{
  e.preventDefault();
  addCard(titleInput.value, linkInput.value);
  titleInput.value = '';
  linkInput.value = '';
  closePopup(e.target);
});

function addCard(name, link, alt='') {
  const cardTemplate = document.querySelector('#card').content;
  const cardElements = cardTemplate.querySelector('.elements__card').cloneNode(true);

  cardElements.querySelector('.elements__delete-btn').addEventListener('click', () => cardElements.closest('.elements__card').remove());
  cardElements.querySelector('.elements__like').addEventListener('click', (e) => e.target.classList.toggle('elements__like_active'));
  cardElements.querySelector('.elements__photo').addEventListener('click', () => {
    imagePopup.querySelector('.popup__image').src = link;
    imagePopup.querySelector('.popup__subtitle').textContent = name;
    openPopup(imagePopup);
  });

  cardElements.querySelector('.elements__photo').src = link;
  cardElements.querySelector('.elements__photo').alt = alt;
  cardElements.querySelector('.elements__title').textContent = name;
  elements.prepend(cardElements);
}

function openPopup(elem) {
  elem.classList.add('popup_opened');
}

function closePopup(elem) {
  elem.closest('.popup').classList.remove('popup_opened');
}


