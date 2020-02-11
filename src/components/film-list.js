import {createElement} from '../utils';

/**
 * Создаёт и возвращает разметку списка фильмов
 * @param {string} title - заголовок
 * @return {string}
 */
const createFilmsListTemplate = (title = null) => {
  const listTitle = `<h2 class="films-list__title ${title ? `` : `visually-hidden`}">${title ? title : `All movies. Upcoming`}</h2>`;

  return (
    `<section class="${title ? `films-list--extra` : `films-list`}">
      ${listTitle}
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmsList {
  constructor(title) {
    this._title = title;
    this._element = null;
  }

  getTemplate() {
    return createFilmsListTemplate(this._title);
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
