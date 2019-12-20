import {createElement, renderDataFromArrayOfObjects} from '../utils';

/**
 * создаёт и возвращает разметку скрытой кнопки под изображением карточки
 * @param {String} control - данные из объекта кнопок управления
 * @return {String}
 */
const getFilmCardControlTemplate = (control) => {
  const {name, active, desc} = control;

  return (/* html */
    `<button class="film-card__controls-item button ${active ? `film-card__controls-item--active` : ``} film-card__controls-item--${name}">${desc}</button>`
  );
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
    controls
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
      ${renderDataFromArrayOfObjects(controls, getFilmCardControlTemplate)}
    </form>
  </article>`
  );
};

export default class FilmCard {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return getFilmCardTemplate(this._films);
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
