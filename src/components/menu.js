import {createElement} from "../utils";

/**
 * Создаёт и возвращает разметку ссылки навигации.
 * @param {Object} link - данные из объекта ссылки навигации
 * @return {String}
 */
const getMenuLinkTemplate = (link) => {
  const {name, path, active, additional, desription, desriptionItemCount} = link;

  return (/* html */
    `<a href=${path} class="main-navigation__item ${active ? `main-navigation__item--active` : ``}${additional ? `main-navigation__item--additional` : ``}">${name} ${desription ? `<span class="main-navigation__item-count">${desriptionItemCount}</span>` : ``}</a>`
  );
};

/**
 * создаёт и возвращает разметку навигации
 * @param {Object} links - данные из массива ссылок навигации
 * @return {String}
 */
const getMenuTemplate = (links) => {
  const menuLinksTemplate = links.map((link) => getMenuLinkTemplate(link)).join(`\n`);

  return (/* html */
    `<nav class="main-navigation">
      ${menuLinksTemplate}
    </nav>`
  );
};

export default class Menu {
  constructor(menuLinks) {
    this._menuLinks = menuLinks;
    this._element = null;
  }

  getTemplate() {
    return getMenuTemplate(this._menuLinks);
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
