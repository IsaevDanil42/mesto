let closeBtn = document.querySelector('.popup__close-btn');
let popupOpened = document.querySelector('.popup');

closeBtn.addEventListener('click', function(evt){
  evt.preventDefault();
  popupOpened.classList.remove('popup_opened');
});
