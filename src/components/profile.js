import AbstractComponent from './abstract-component.js';
import {userRanks} from '../const.js';

const getUserRank = (moviesWatched) => {
  if (moviesWatched >= userRanks.novice.min && moviesWatched <= userRanks.novice.max) {
    return `Novice`;
  }

  if (moviesWatched >= userRanks.fan.min && moviesWatched <= userRanks.fan.max) {
    return `Fan`;
  }

  if (moviesWatched >= userRanks.movieBuff.min) {
    return `Movie buff`;
  }

  return ``;
};

const createProfileTemplate = (count) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getUserRank(count)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile extends AbstractComponent {
  constructor(count) {
    super();

    this._count = count;
  }

  getTemplate() {
    return createProfileTemplate(this._count);
  }
}

export {getUserRank};
