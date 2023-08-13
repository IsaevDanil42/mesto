export default class Card {
  #name;
  #link;
  #handleCardClick;
  #templateSelector;
  #element;
  #elementPhoto;
  constructor({ cardItem, handleCardClick }, templateSelector) {
    this.#name = cardItem.name || cardItem.placename;
    this.#link = cardItem.link;
    this.#handleCardClick = handleCardClick;
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

  #handleDeleteCard() {
    this.#element.remove();
  }

  #toggleLike(e) {
    e.target.classList.toggle('elements__like_active');
  }

  #setEventListeners() {
    this.#element.querySelector('.elements__delete-btn').addEventListener('click', () => {
      this.#handleDeleteCard();
    });
    this.#elementPhoto.addEventListener('click', () => {
      this.#handleCardClick(this.#name, this.#link);
    });
    this.#element.querySelector('.elements__like').addEventListener('click', (e) => {
      this.#toggleLike(e);
    });
  }

  createCard() {
    this.#element = this.#getTemplate();
    this.#elementPhoto = this.#element.querySelector('.elements__photo');
    this.#setEventListeners();

    this.#element.querySelector('.elements__title').textContent = this.#name;
    this.#elementPhoto.src = this.#link;
    this.#elementPhoto.alt = this.#name;

    return this.#element;
  }
}
