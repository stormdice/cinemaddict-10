import SortComponent, {SortType} from '../components/sort.js';
import MovieController from './movie-controller.js';
import FilmsListComponent from '../components/film-list.js';
import NoFilmsComponent from '../components/no-films.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import {RenderPosition, render, remove} from '../utils/render.js';
import {getTopFilms} from '../utils/common.js';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

/**
 * Отрисовывает фильмы
 * @param {HTMLElement} filmListElement - контейнер в который будет вставлять
 * @param {Object[]} films - массив объектов с фильмами
 */
const renderFilms = (filmListElement, films) => {
  films.forEach((film) => {
    new MovieController(filmListElement).render(film);
  });
};

/**
 * Отрисовывает блок с лучшими фильмами
 * @param {HTMLElement} container - контейнер для вставки
 * @param {Array} topFilms - массив фильмов
 * @param {string} title - заголовок блока
 */
const renderTopFilms = (container, topFilms, title) => {
  if (topFilms.length) {
    const topFilmsList = new FilmsListComponent(title);
    render(container, topFilmsList, RenderPosition.BEFOREEND);
    renderFilms(topFilmsList.getElement(), topFilms);
  }
};

/**
 * Класс, отвечающий за отрисовку фильмов
 */
export default class PageController {
  /**
   * Создаёт контейнер
   * @param {HTMLElement} container - контейнер для вставки блоков с фильмами
   */
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmListComponent = new FilmsListComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  /**
   * Отрисовывает основной блок с фильмами, кнопку загрузить больше, дополнительные блоки с лучшими фильмами
   * @param {Array} films - массив объектов с данными фильмов
   */
  render(films) {
    /**
     * Отрисовывает кнопку показать больше
     */
    const renderShowMoreButton = () => {
      if (showingFilmsCount >= films.length) {
        return;
      }

      render(filmListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      this._showMoreButtonComponent.setClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

        renderFilms(filmListElement, films.slice(prevFilmsCount, showingFilmsCount));

        if (showingFilmsCount >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    const container = this._container.getElement();
    const topRatedFilms = getTopFilms(films, `totalRating`);
    const mostCommentedFilms = getTopFilms(films, `comments`);

    container.insertAdjacentElement(`beforebegin`, this._sortComponent.getElement());

    if (!films.length) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._filmListComponent, RenderPosition.BEFOREEND);

    const filmListElement = this._filmListComponent.getElement();

    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    renderFilms(filmListElement, films.slice(0, showingFilmsCount));

    renderShowMoreButton();

    renderTopFilms(container, topRatedFilms, `Top rated`);
    renderTopFilms(container, mostCommentedFilms, `Most commented`);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedFilms = [];

      switch (sortType) {
        case SortType.DEFAULT:
          sortedFilms = films.slice(0, showingFilmsCount);
          break;
        case SortType.DATE:
          sortedFilms = films.slice().sort((a, b) => b.releaseDate - a.releaseDate);
          break;
        case SortType.RATING:
          sortedFilms = films.slice().sort((a, b) => b.totalRating - a.totalRating);
          break;
      }

      filmListElement.querySelector(`.films-list__container`)
        .innerHTML = ``;

      renderFilms(container, sortedFilms);

      if (sortType === SortType.DEFAULT) {
        renderShowMoreButton();
      } else {
        remove(this._showMoreButtonComponent);
      }
    });
  }
}
