import AbstractComponent from './abstract-component.js';

/**
 * Создаёт и возвращает разметку списка фильмов
 * @param {string} title - заголовок
 * @return {string}
 */
const createFilmsListTemplate = (title = false) => {
  const listTitle = `<h2 class="films-list__title ${title ? `` : `visually-hidden`}">${title ? title : `All movies. Upcoming`}</h2>`;

  return (
    `<section class="${title ? `films-list--extra` : `films-list`}">
      ${listTitle}
      <div class="films-list__container"></div>
    </section>`
  );
};

/**
 * Класс, представляющий список фильмов
 * @extends AbstractComponent
 */
export default class FilmsList extends AbstractComponent {
  /**
   * Создаёт заголовок
   * @param {string} title - заголовок для списка
   */
  constructor(title) {
    super();

    this._title = title;
  }

  /**
   * Возвращает функцию создания разметки
   * @return {Function}
   */
  getTemplate() {
    return createFilmsListTemplate(this._title);
  }
}
