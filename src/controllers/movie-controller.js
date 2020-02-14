import FilmComponent from '../components/film.js';
import FilmDetailsComponent from '../components/film-details.js';
import {RenderPosition, render} from '../utils/render.js';

export default class MovieController {
  /**
   * Создаёт контейнер
   * @param {HTMLElement} container - контейнер для вставки
   */
  constructor(container) {
    this.container = container;

    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  /**
   * Отрисовывает фильм
   * @param {Object} film - данные из объекта фильмов
   */
  render(film) {
    this._filmComponent = new FilmComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._filmDetailsComponent.setCloseButtonClickHandler(() => {
      this._filmDetailsComponent.getElement().remove();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._filmComponent.setOpenDetailsClickHandler((evt) => {
      evt.preventDefault();
      render(document.body, this._filmDetailsComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    render(this.container.querySelector(`.films-list__container`), this._filmComponent, RenderPosition.BEFOREEND);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._filmDetailsComponent.getElement().remove();

      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
