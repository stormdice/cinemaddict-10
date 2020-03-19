import MenuComponent from '../components/menu.js';
import {FilterType} from '../const.js';
import {render, replace, RenderPosition} from '../utils/render.js';
import {getFilmsByFilter} from '../utils/filter.js';

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;
    this._handler = null;

    this._onDataChange = this._onDataChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allFilms = this._moviesModel.allFilms;

    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getFilmsByFilter(allFilms, filterType).length,
        active: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new MenuComponent(filters);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }

    if (this._handler) {
      this.setScreenChange(this._handler);
    }
  }

  setScreenChange(handler) {
    this._filterComponent.setClickHandler(handler);
    this._handler = handler;
  }

  onFilterChange(filterType) {
    this._moviesModel.filter = filterType;
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}