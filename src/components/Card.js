export default class Card {
  #name;
  #link;
  #token;
  #likes;
  #userId
  #handleCardClick;
  #handleDeleteClick;
  #handleAddLike;
  #handleRemoveLike;
  #templateSelector;
  element;
  #elementPhoto;
  elementCounter;
  constructor({ cardItem, userId, handleCardClick, handleDeleteClick, handleAddLike, handleRemoveLike }, templateSelector) {
    this.#name = cardItem.name;
    this.#link = cardItem.link;
    this.cardId = cardItem._id;
    this.#token = cardItem.owner._id;
    this.#userId = userId;
    this.#likes = cardItem.likes;
    this.#handleCardClick = handleCardClick;
    this.#handleDeleteClick = handleDeleteClick;
    this.#handleAddLike = handleAddLike;
    this.#handleRemoveLike = handleRemoveLike;
    this.#templateSelector = templateSelector;
  }

  #getTemplate() {
    const cardElement = document
      .querySelector(this.#templateSelector)
      .content
      .querySelector('.elements__card')
      .cloneNode(true);

    return cardElement;
  }

  toggleLike(e) {
    e.target.classList.toggle('elements__like_active');
  }

  #setEventListeners() {
    this.element.querySelector('.elements__delete-btn').addEventListener('click', () => {
      this.#handleDeleteClick(this.cardId, this.element);
    });
    this.#elementPhoto.addEventListener('click', () => {
      this.#handleCardClick(this.#name, this.#link);
    });
    this.element.querySelector('.elements__like').addEventListener('click', (e) => {
      if(!e.target.classList.contains('elements__like_active')){
        this.#handleAddLike(this.cardId)
          .then((card) => {
            this.elementCounter.textContent = card.likes.length;
            this.toggleLike(e);
          })
          .catch((err) => (console.log(err)))
      } else {
        this.#handleRemoveLike(this.cardId)
          .then((card) => {
            this.elementCounter.textContent = card.likes.length;
            this.toggleLike(e);
          })
          .catch((err) => (console.log(err)))
      }
    });
  }

  createCard() {
    this.element = this.#getTemplate();
    this.#elementPhoto = this.element.querySelector('.elements__photo');
    this.elementCounter = this.element.querySelector('.elements__like-counter');
    this.#setEventListeners();
    if(this.#token === this.#userId) {
      this.element.querySelector('.elements__delete-btn').style.display = 'block';
    }
    for(let i = 0; i < this.#likes.length; i++){
      if(this.#likes[i]._id === this.#userId) {
        this.element.querySelector('.elements__like').classList.add('elements__like_active');
      }
    }

    this.element.querySelector('.elements__title').textContent = this.#name;
    this.#elementPhoto.src = this.#link;
    this.#elementPhoto.alt = this.#name;
    this.elementCounter.textContent = this.#likes.length;

    return this.element;
  }
}
