import {createElement} from '../utils';

/**
 * Сделать первую букву большой
 * @param {string} string - строка
 * @return {string}
 */
const toUppercaseFirstLetter = (string) => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

/**
 * Проверить заголовок на соответствие
 * @param {string} name - название пукта меню из объекта данных меню
 * @return {string}
 */
const checkTitle = (name) => {
  if (name === `all`) {
    return `${toUppercaseFirstLetter(name)} movies`;
  }

  return toUppercaseFirstLetter(name);
};

/**
 * Создаёт и возвращает разметку пунктов меню
 * @param {Object} item - данные из объекта пунктов меню
 * @param {boolean} isActive - активен ли пункт
 * @return {string}
 */
const createMenuItemTemplate = (item, isActive) => {
  const [name, count] = item;

  const title = checkTitle(name);
  const countMarkup = count > 0 ? `<span class="main-navigation__item-count">${count}</span>` : ``;
  const activeClass = isActive ? `main-navigation__item--active` : ``;
  const additionalClass = name === `stats` ? `main-navigation__item--additional` : ``;

  return (
    `<a href="#${name}" class="main-navigation__item ${activeClass} ${additionalClass}">${title} ${countMarkup}</a>`
  );
};

/**
 * Создаёт и возвращает разметку меню
 * @param {Array} menu - массив пунктов меню
 * @return {string}
 */
const createMenuTemplate = (menu) => {
  const menuMarkup = Object.entries(menu).map((item, index) => createMenuItemTemplate(item, index === 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
      ${menuMarkup}
    </nav>`
  );
};

export default class Menu {
  constructor(menu) {
    this._menu = menu;
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._menu);
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
