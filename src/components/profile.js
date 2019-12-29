import AbstractComponent from "./abstract-component";
import {UserRating} from '../const';

/**
 * Возращает звание пользователя в зависимости от числа просмотренных фильмов
 * @param {*} count - число просмотренных фильмов
 * @return {String}
 */
const checkUserRank = (count) => {
  if (count <= UserRating.MIN) {
    return `Novice`;
  }

  if (count <= UserRating.MAX) {
    return `Fan`;
  }

  if (count > UserRating.MAX) {
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

export default class Profile extends AbstractComponent {
  getTemplate() {
    return getProfileTemplate();
  }
}
