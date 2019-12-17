import {createElement} from '../utils.js';

const FilmsRange = {
  MIN: 10,
  MAX: 21
};

/**
 * Возращает звание пользователя в зависимости от числа просмотренных фильмов
 * @param {*} count - число просмотренных фильмов
 * @return {String}
 */
const checkUserRank = (count) => {
  if (count <= FilmsRange.MIN) {
    return `Novice`;
  }

  if (count <= FilmsRange.MAX) {
    return `Fan`;
  }

  if (count > FilmsRange.MAX) {
    return `Movie Buff`;
  }

  return ``;
};

const numberOfFilmsWatched = Math.floor(Math.random() * 30);
const userRank = checkUserRank(numberOfFilmsWatched);

/**
 * создаёт и возвращает разметку профиля
 * @return {String}
 */
const getProfileTemplate = () => (/* html */
  `<section class="header__profile profile">
    <p class="profile__rating">${userRank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

export default class Profile {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getProfileTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
