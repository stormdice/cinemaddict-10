import ProfileComponent from '../components/profile.js';
import {render, replace, RenderPosition} from '../utils/render.js';

export default class ProfileController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._profileComponent = null;

    this._onDataChange = this._onDataChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const watchedMovies = this._moviesModel.watchedFilms.length;
    const oldComponent = this._profileComponent;

    this._profileComponent = new ProfileComponent(watchedMovies);

    if (oldComponent) {
      replace(this._profileComponent, oldComponent);
    } else {
      render(container, this._profileComponent, RenderPosition.BEFOREEND);
    }
  }

  _onDataChange() {
    this.render();
  }
}
