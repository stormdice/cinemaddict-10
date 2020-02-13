import AbstractComponent from './abstract-component.js';

/**
 * Возвращает 1 жанр для карточки фильма
 * @param {Set} genres - сет жанров
 * @return {Array}
 */
const generateGenre = (genres) => {
  return Array.from(genres).slice(0, 1);
};

/**
 * Создаёт и возвращает разметку фильма
 * @param {Object} film - данные из объекта фильма
 * @return {string}
 */
const createFilmTemplate = (film) => {
  const {title, totalRating, releaseDate, runtime, description, poster, genre, isWatchlist, isWatched, isFavorite, comments} = film;

  const release = releaseDate.getFullYear();
  const filmGenre = generateGenre(genre);

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
      <a class="film-card__comments">${comments} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${setActiveClass(isWatchlist)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${setActiveClass(isWatched)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${setActiveClass(isFavorite)}">Mark as favorite</button>
      </form>
    </article>`
  );
};

/**
 * Класс, представляющий карточку фильма
 * @extends AbstractComponent
 */
export default class Film extends AbstractComponent {
  /**
   * Создаёт карточку фильма
   * @param {Object} film - данные из объека фильма
   */
  constructor(film) {
    super();

    this._film = film;
  }

  /**
   * Возвращает функцию создания разметки
   * @return {Function}
   */
  getTemplate() {
    return createFilmTemplate(this._film);
  }

  /**
   * Устанавливает слушатель событий
   * @param {Function} handler - функция для слушателя
   */
  setOpenDetailsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }
}
