import SortComponent from '../components/sort.js';
import {SortType} from '../const.js';
import MovieController from './movie-controller.js';
import FilmsListComponent from '../components/film-list.js';
import NoFilmsComponent from '../components/no-films.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import {RenderPosition, render, remove} from '../utils/render.js';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

/**
 * Отрисовывает фильмы
 * @param {HTMLElement} filmListElement - контейнер в который будет вставлять
 * @param {Object[]} films - массив объектов с фильмами
 * @param {Function} onDataChange - изменяет данные компонента
 * @param {Function} onViewChange - показывает стандартное состояние карточки
 * @return {Object} - Возвращает контроллер с фильмами
 */
const renderFilms = (filmListElement, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(filmListElement, onDataChange, onViewChange);
    movieController.render(film);

    return movieController;
  });
};

/**
 * Класс, отвечающий за отрисовку фильмов
 */
export default class PageController {
  /**
   * Создаёт контейнер
   * @param {HTMLElement} container - контейнер для вставки блоков с фильмами
   * @param {Object} moviesModel - модель фильмов
   */
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._showedFilmControllers = [];
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    this._sortComponent = new SortComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmListComponent = new FilmsListComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  /**
   * Отображает основной блок с фильмами, кнопку загрузить больше и дополнительные блоки с лучшими фильмами
   * @param {Array} films - массив объектов с данными фильмов
   */
  render() {
    const container = this._container.getElement();
    const films = this._moviesModel.films;

    container.insertAdjacentElement(`beforebegin`, this._sortComponent.getElement());

    if (!films.length) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._filmListComponent, RenderPosition.BEFOREEND);

    this._renderFilms(films.slice(0, this._showingFilmsCount));

    this._renderShowMoreButton();

    this._renderTopFilms(container, `totalRating`, `Top rated`);
    this._renderTopFilms(container, `comments`, `Most commented`);
  }

  /**
   * Отрисовывает карточки фильмов
   * @param {Object[]} films - массив с данными фильмов
   */
  _renderFilms(films) {
    const filmListElement = this._filmListComponent.getElement();

    const newFilms = renderFilms(filmListElement, films, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._showingFilmsCount = this._showedFilmControllers.length;
  }

  /**
   * Удаляет карточки фильмов
   */
  _removeFilms() {
    const filmListContainerElement = this._filmListComponent.getElement().querySelector(`.films-list__container`);

    filmListContainerElement.innerHTML = ``;

    this._showedFilmControllers = [];
  }

  /**
   * Изменяет данные объекта
   * @param {Object} movieController контроллер фильмов
   * @param {Object} oldData - станые данные
   * @param {Object} newData - новые данные
   */
  _onDataChange(movieController, oldData, newData) {
    const isSuccess = this._moviesModel.updateFilm(oldData.id, newData);

    if (isSuccess) {
      movieController.render(newData);
    }
  }

  /**
   * Переводит все карточки с фильмами в стандартный режим(закрывает все попапы)
   */
  _onViewChange() {
    this._showedFilmControllers.forEach((it) => {
      it.setDefaultView();
    });
  }

  /**
   * Отрисовывает кнопку показать больше
   */
  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._showingFilmsCount >= this._moviesModel.films.length) {
      return;
    }

    const filmListElement = this._filmListComponent.getElement();
    render(filmListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  /**
   * показывает очередное количество фильмов
   */
  _onShowMoreButtonClick() {
    const prevFilmsCount = this._showingFilmsCount;
    const films = this._moviesModel.films;

    this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    this._renderFilms(films.slice(prevFilmsCount, this._showingFilmsCount));

    if (this._showingFilmsCount >= this._moviesModel.films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  /**
   * Сортирует фильмы
   * @param {string} sortType - тип сортировки
   */
  _onSortTypeChange(sortType) {
    let sortedFilms = [];
    const films = this._moviesModel.films;

    switch (sortType) {
      case SortType.DEFAULT:
        sortedFilms = films.slice(0, this._showingFilmsCount);
        break;
      case SortType.DATE:
        sortedFilms = films.slice().sort((a, b) => b.releaseDate - a.releaseDate);
        break;
      case SortType.RATING:
        sortedFilms = films.slice().sort((a, b) => b.totalRating - a.totalRating);
        break;
    }

    this._removeFilms();
    this._renderFilms(sortedFilms);

    if (sortType === SortType.DEFAULT) {
      this._renderShowMoreButton();
    } else {
      remove(this._showMoreButtonComponent);
    }
  }

  /**
   * Отрисовывает блок с двумя лучшими фильмами
   * @param {HTMLElement} container - контейнер для вставки
   * @param {string} props - свойство из объекта фильма
   * @param {string} title - заголовок блока
   */
  _renderTopFilms(container, props, title) {
    const topFilms = this._moviesModel.films
      .sort((a, b) => b[props] - a[props])
      .slice(0, 2)
      .filter((film) => film[props]);

    if (topFilms.length) {
      const topFilmsList = new FilmsListComponent(title);
      render(container, topFilmsList, RenderPosition.BEFOREEND);
      renderFilms(topFilmsList.getElement(), topFilms, this._onDataChange, this._onViewChange);
    }
  }
}
