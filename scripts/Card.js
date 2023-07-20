import { openPopup, imagePopup } from './index.js';

export default class Card {
  #name;
  #link;
  #templateSelector;
  #element;
  constructor(data, templateSelector) {
    this.#name = data.name;
    this.#link = data.link;
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

  #handleOpenImagePopup() {
    imagePopup.querySelector('.popup__image').alt = this.#name;
    imagePopup.querySelector('.popup__image').src = this.#link;
    imagePopup.querySelector('.popup__subtitle').textContent = this.#name;
    openPopup(imagePopup);
  }

  #toggleLike(e) {
    e.target.classList.toggle('elements__like_active');
  }

  #setEventListeners() {
    this.#element.querySelector('.elements__delete-btn').addEventListener('click', () => {
      this.#handleDeleteCard();
    })
    this.#element.querySelector('.elements__photo').addEventListener('click', () => {
      this.#handleOpenImagePopup();
    })
    this.#element.querySelector('.elements__like').addEventListener('click', (e) => {
      this.#toggleLike(e);
    });
  }

  createCard() {
    this.#element = this.#getTemplate();
    this.#setEventListeners();

    this.#element.querySelector('.elements__title').textContent = this.#name;
    this.#element.querySelector('.elements__photo').src = this.#link;
    this.#element.querySelector('.elements__photo').alt = this.#name;

    return this.#element;
  }
}
