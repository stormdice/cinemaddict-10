import FilmComponent from '../components/film.js';
import FilmDetailsComponent from '../components/film-details.js';
import {RenderPosition, render, replace} from '../utils/render.js';

export default class MovieController {
  /**
   * Создаёт контейнер
   * @param {HTMLElement} container - контейнер для вставки
   * @param {Function} onDataChange - функция для изменения объекта дааных
   */
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  /**
   * Отрисовывает фильм
   * @param {Object} film - данные из объекта фильмов
   */
  render(film) {
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmComponent = new FilmComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._filmComponent.setOpenDetailsClickHandler((evt) => {
      evt.preventDefault();
      render(document.body, this._filmDetailsComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._filmComponent.setWatchlistClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist,
      }));
    });

    this._filmComponent.setWatchedClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });

    this._filmComponent.setFavoriteClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    this._filmDetailsComponent.setCloseButtonClickHandler(() => {
      this._filmDetailsComponent.getElement().remove();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._filmDetailsComponent.setWatchlistInputChangeHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist,
      }));
    });

    this._filmDetailsComponent.setWatchedInputChangeHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });

    this._filmDetailsComponent.setFavoriteInputChangeHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    if (oldFilmComponent && oldFilmDetailsComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container.querySelector(`.films-list__container`), this._filmComponent, RenderPosition.BEFOREEND);
    }
  }

  /**
   * Удаляет DOM элемент попапа с фильмом
   * @param {Event} evt - объект событие
   */
  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._filmDetailsComponent.getElement().remove();

      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
