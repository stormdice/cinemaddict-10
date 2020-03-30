import StatisticsComponent from '../components/statistics';
import {RenderPosition, render, replace} from '../utils/render';

export default class StatisticsController {
  constructor(container, MoviesModel) {
    this._container = container;
    this._moviesModel = MoviesModel;

    this._statisticsComponent = null;

    this._onDataChange = this._onDataChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const oldComponent = this._statisticsComponent;
    const watchedMovies = this._moviesModel.watchedFilms;

    this._statisticsComponent = new StatisticsComponent(watchedMovies);

    if (oldComponent) {
      replace(this._statisticsComponent, oldComponent);
    } else {
      render(container, this._statisticsComponent, RenderPosition.BEFOREEND);
    }
  }

  _onDataChange() {
    this.render();
  }
}
