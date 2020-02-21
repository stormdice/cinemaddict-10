import AbstractComponent from './abstract-component.js';
import {getFilterName} from '../utils/common.js';

const createFilterMarkup = (filter) => {
  const {name, count, active} = filter;

  const title = getFilterName(name);
  const countMarkup = count > 0 ? `<span class="main-navigation__item-count">${count}</span>` : ``;
  const activeClass = active ? `main-navigation__item--active` : ``;

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
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      handler();
    });
  }
}
