let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.profile__edit-btn');
let nameProfile = document.querySelector('.profile__name');
let profProfile = document.querySelector('.profile__profession');
let form = document.querySelector('.popup__form');
let nameInput = document.querySelector('#name');
let profInput = document.querySelector('#profession');
let closeBtn = document.querySelector('.popup__close-btn');

editBtn.addEventListener('click', function(){
  nameInput.value = nameProfile.textContent;
  profInput.value = profProfile.textContent;
  popup.classList.add('popup_opened');
})

closeBtn.addEventListener('click', closePopup);

form.addEventListener('submit', function(evt){
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  profProfile.textContent = profInput.value;
  closePopup();
})

function closePopup() {
  popup.classList.remove('popup_opened');
}
