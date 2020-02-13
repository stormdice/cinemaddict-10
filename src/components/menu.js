import AbstractComponent from './abstract-component.js';

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
 * @param {string[]} menu - массив пунктов меню
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

/**
 * Класс, представляющий меню
 * @extends AbstractComponent
 */
export default class Menu extends AbstractComponent {
  /**
   * Создаёт меню
   * @param {Object} menu - данные из объека меню
   */
  constructor(menu) {
    super();

    this._menu = menu;
  }

  /**
   * Возвращает функцию создания разметки
   * @return {Function}
   */
  getTemplate() {
    return createMenuTemplate(this._menu);
  }
}
