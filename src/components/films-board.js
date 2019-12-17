import {createElement} from '../utils.js';

/**
 * создаёт и возвращает разметку для раздела с фильмами
 * @return {String}
 */
const getFilmsBoardTemplate = () => (/* html */
  `<section class="films"></section>`
);

export default class FilmBoard {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getFilmsBoardTemplate();
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
