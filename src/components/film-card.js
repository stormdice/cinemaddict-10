import AbstractComponent from "./abstract-component";

/**
 * проверяет активность класса и в зависимости от этого выставляет класс в разметке
 * @param {boolean} prop - активен ли класс
 * @return {string}
 */
const isActive = (prop) => {
  return prop ? `film-card__controls-item--active` : ``;
};

/**
 * создаёт и возвращает разметку карточки фильма из массива объектов.
 * @param {Object} film - данные из объекта фильма
 * @return {String}
 */
const getFilmCardTemplate = (film) => {
  const {
    filmInfo: {
      title,
      totalRating,
      poster,
    },
    release: {
      date
    },
    runtime,
    genres,
    description,
    comments,
    isWatchlist,
    isWatched,
    isFavorite
  } = film;

  const genre = genres.slice(0, 1);
  const miniDescription = description.slice(0, 2).join(` `);

  return (/* html */
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${date}</span>
        <span class="film-card__duration">${runtime}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src=${poster} alt="" class="film-card__poster">
      <p class="film-card__description">${miniDescription}</p>
      <a class="film-card__comments">${comments} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isActive(isWatchlist)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isActive(isWatched)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isActive(isFavorite)}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return getFilmCardTemplate(this._film);
  }

  setOpenDetailsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
