import debounce from 'lodash/debounce';
import {DEBOUNCE_TIMEOUT} from '../const';
import AbstractComponent from './abstract-component';
import {formatRuntime, filmCardFormatReleaseDate} from '../utils/common';

const MAX_DESCRIPTION_LENGTH = 140;

const checkDescriptionLength = (description) => {
  const length = description.length;

  return length > MAX_DESCRIPTION_LENGTH ? `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...` : description;
};

const generateGenre = (genres) => {
  return Array.from(genres).slice(0, 1);
};

const createFilmTemplate = (film) => {
  const {
    title,
    totalRating,
    releaseDate,
    runtime,
    description,
    poster,
    genres,
    isWatchlist,
    isWatched,
    isFavorite,
    comments
  } = film;

  const release = filmCardFormatReleaseDate(releaseDate);
  const filmGenre = generateGenre(genres);
  const filmRuntime = formatRuntime(runtime);
  const shortDescription = checkDescriptionLength(description);
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
        <span class="film-card__duration">${filmRuntime}</span>
        <span class="film-card__genre">${filmGenre}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${setActiveClass(isWatchlist)}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${setActiveClass(isWatched)}" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${setActiveClass(isFavorite)}" type="button">Mark as favorite</button>
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
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, debounce(handler, DEBOUNCE_TIMEOUT));
  }

  setWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, debounce(handler, DEBOUNCE_TIMEOUT));
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, debounce(handler, DEBOUNCE_TIMEOUT));
  }
}
