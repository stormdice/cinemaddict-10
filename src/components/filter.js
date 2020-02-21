import AbstractComponent from './abstract-component.js';

/**
 * Создаёт и возвращает разметку пунктов меню
 * @param {Object} item - данные из объекта пунктов меню
 * @return {string}
 */
const createFilterItemTemplate = (item) => {
  const {name, count, active} = item;

  const countMarkup = count > 0 ? `<span class="main-navigation__item-count">${count}</span>` : ``;
  const activeClass = active ? `main-navigation__item--active` : ``;
  const additionalClass = name === `stats` ? `main-navigation__item--additional` : ``;

  return (
    `<a href="#${name}" class="main-navigation__item ${activeClass} ${additionalClass}">${name} ${countMarkup}</a>`
  );
};

/**
 * Создаёт и возвращает разметку меню
 * @param {string[]} filters - массив пунктов меню
 * @return {string}
 */
const createFilterTemplate = (filters) => {
  const filterMarkup = filters.map((item) => createFilterItemTemplate(item)).join(`\n`);

  return (
    `<nav class="main-navigation">
      ${filterMarkup}
    </nav>`
  );
};

/**
 * Класс, представляющий меню
 * @extends AbstractComponent
 */
export default class Filter extends AbstractComponent {
  /**
   * Создаёт меню
   * @param {Object} filters - данные из объека меню
   */
  constructor(filters) {
    super();

    this._filters = filters;
  }

  /**
   * Возвращает функцию создания разметки
   * @return {Function}
   */
  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}
