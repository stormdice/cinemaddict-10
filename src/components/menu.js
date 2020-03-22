import AbstractComponent from './abstract-component';
import {FilterType} from '../const';
import {getFilterTitle} from '../utils/common';

const createFilterMarkup = (filter) => {
  const {name, count, active} = filter;

  const createFiltersCountMarkup = () => {
    if (name === FilterType.ALL) {
      return ``;
    }

    return count > 0 ? `<span class="main-navigation__item-count">${count}</span>` : ``;
  };

  const title = getFilterTitle(name);
  const activeClass = active ? `main-navigation__item--active` : ``;
  const countMarkup = createFiltersCountMarkup();

  return (
    `<a href="#${name}" class="main-navigation__item ${activeClass}" data-menu-item-name="${name}">${title} ${countMarkup}</a>`
  );
};

const createMenuTemplate = (menuItem) => {
  const filterMarkup = menuItem.map((filter) => createFilterMarkup(filter)).join(`\n`);

  return (
    `<nav class="main-navigation">
      ${filterMarkup}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional" data-menu-item-name="stats">Stats</a>
    </nav>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
    this._currentFilterType = FilterType.ALL;
    this._linkElements = this.getElement().querySelectorAll(`.main-navigation__item`);
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      let filterName = evt.target.dataset.menuItemName;
      const isFilterName = filterName !== undefined;
      const isFilterChildNode = evt.target.parentElement.dataset.menuItemName !== undefined;

      if (!isFilterName && !isFilterChildNode) {
        return;
      }

      if (isFilterChildNode) {
        filterName = evt.target.parentElement.dataset.menuItemName;
      }

      if (this._currentFilterType === filterName) {
        return;
      }

      this._currentFilterType = filterName;

      this._setActiveClass(evt);

      handler(filterName);
    });
  }

  _setActiveClass(evt) {
    this._linkElements.forEach((link) => {
      link.classList.remove(`main-navigation__item--active`);
    });

    if (evt.target.tagName === `A`) {
      evt.target.classList.add(`main-navigation__item--active`);
    }

    if (evt.target.parentElement.tagName === `A`) {
      evt.target.parentElement.classList.add(`main-navigation__item--active`);
    }
  }
}
