let editBtn = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let popupName = document.querySelector('.popup__name');
let popupProf = document.querySelector('.popup__profession');

editBtn.addEventListener('click', function(){
  let name = document.querySelector('.profile__name').textContent;
  let prof = document.querySelector('.profile__profession').textContent;

  popupName.value = name;
  popupProf.value = prof;
  popup.classList.add('popup_opened');
});
