import AbstractComponent from './abstract-component.js';
import {filmCardFormatReleaseDate} from '../utils/common.js';

const generateGenre = (genres) => {
  return Array.from(genres).slice(0, 1);
};

const createFilmTemplate = (film) => {
  const {title, totalRating, releaseDate, runtime, description, poster, genre, isWatchlist, isWatched, isFavorite, comments} = film;

  const release = filmCardFormatReleaseDate(releaseDate);
  const filmGenre = generateGenre(genre);
  const commentsCount = comments.length;

  const setActiveClass = (isActive) => {
    return isActive ? `film-card__controls-item--active` : ``;
  };

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${release}</span>
        <span class="film-card__duration">${runtime}</span>
        <span class="film-card__genre">${filmGenre}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${setActiveClass(isWatchlist)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${setActiveClass(isWatched)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${setActiveClass(isFavorite)}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class Film extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmTemplate(this._film);
  }

  setOpenDetailsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }

  setWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }

  setWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }
}
