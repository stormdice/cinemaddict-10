import ProfileComponent from '../components/profile';
import {render, replace, RenderPosition} from '../utils/render';

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
    const watchedMoviesCount = this._moviesModel.watchedFilms.length;
    const oldComponent = this._profileComponent;

    this._profileComponent = new ProfileComponent(watchedMoviesCount);

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
