let submitBtn = document.querySelector('.popup__submit-btn');
let nameSave = document.querySelector('.profile__name');
let profSave = document.querySelector('.profile__profession');
let openedPopup = document.querySelector('.popup');

submitBtn.addEventListener('click', function(evt){
  evt.preventDefault();
  let nameInput = document.querySelector('.popup__name').value;
  let profInput = document.querySelector('.popup__profession').value;

  nameSave.textContent = nameInput;
  profSave.textContent = profInput;
  openedPopup.classList.remove('popup_opened');
})
