import AbstractComponent from './abstract-component.js';
import {FilterType} from '../const.js';
import {getFilterTitle} from '../utils/common.js';

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
    `<a href="#${name}" class="main-navigation__item ${activeClass}" data-filter-type="${name}">${title} ${countMarkup}</a>`
  );
};

const createFilterTemplate = (filters) => {
  const filterMarkup = filters.map((filter) => createFilterMarkup(filter)).join(`\n`);

  return (
    `<nav class="main-navigation">
      ${filterMarkup}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
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
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      let filterName = evt.target.dataset.filterType;
      const isFilterName = filterName !== undefined;
      const isFilterChildNode = evt.target.parentElement.dataset.filterType !== undefined;
      const isStatistics = evt.target.classList.contains(`main-navigation__item--additional`);

      if (!isFilterName && !isFilterChildNode && !isStatistics) {
        return;
      }

      if (isFilterChildNode) {
        filterName = evt.target.parentElement.dataset.filterType;
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
