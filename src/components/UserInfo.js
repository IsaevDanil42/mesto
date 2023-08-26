export default class UserInfo {
  #nameElement;
  #aboutElement;
  #avatarElement;
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this.#nameElement = document.querySelector(nameSelector);
    this.#aboutElement = document.querySelector(aboutSelector);
    this.#avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name:this.#nameElement.textContent,
      about:this.#aboutElement.textContent
    }
  }

  setUserInfo(name, about) {
    this.#nameElement.textContent = name;
    this.#aboutElement.textContent = about;
  }

  setUserAvatar(avatarUrl) {
    this.#avatarElement.src = avatarUrl;
  }

  serUserId(id) {
    this.userId = id;
  }
}
