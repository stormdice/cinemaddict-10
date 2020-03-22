import AbstractComponent from './abstract-component';
import {userRanks} from '../const';

const getUserRank = (watchedMovies) => {
  if (watchedMovies >= userRanks.novice.min && watchedMovies <= userRanks.novice.max) {
    return `Novice`;
  }

  if (watchedMovies >= userRanks.fan.min && watchedMovies <= userRanks.fan.max) {
    return `Fan`;
  }

  if (watchedMovies >= userRanks.movieBuff.min) {
    return `Movie buff`;
  }

  return ``;
};

const createProfileTemplate = (watchedMoviesCount) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getUserRank(watchedMoviesCount)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile extends AbstractComponent {
  constructor(watchedMovies) {
    super();

    this._watchedMovies = watchedMovies;
  }

  getTemplate() {
    return createProfileTemplate(this._watchedMovies);
  }
}

export {getUserRank};
