import FilmsListComponent from '../components/film-list.js';
import FilmComponent from '../components/film.js';
import FilmDetailsComponent from '../components/film-details.js';
import NoFilmsComponent from '../components/no-films.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import {RenderPosition, render, remove} from '../utils/render.js';
import {getTopFilms} from '../utils/common.js';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

/**
 * Отрисовывает фильмы
 * @param {HTMLElement} filmListElement - контейнер в который будет вставлять
 * @param {Object} film - данные из объекта фильмов
 */
const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      filmDetailsComponent.getElement().remove();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmDetailsComponent.setCloseButtonClickHandler(() => {
    filmDetailsComponent.getElement().remove();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  filmComponent.setOpenDetailsClickHandler((evt) => {
    evt.preventDefault();
    render(document.body, filmDetailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  render(filmListElement.querySelector(`.films-list__container`), filmComponent, RenderPosition.BEFOREEND);
};

/**
 * Отрисовывает фильмы
 * @param {HTMLElement} filmListElement - контейнер в который будет вставлять
 * @param {Object[]} films - массив объектов с фильмами
 */
const renderFilms = (filmListElement, films) => {
  films.forEach((film) => {
    renderFilm(filmListElement, film);
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

    this._noFilmsComponent = new NoFilmsComponent();
    this._filmListComponent = new FilmsListComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  /**
   * Отрисовывает основной блок с фильмами, кнопку загрузить больше, дополнительные блоки с лучшими фильмами
   * @param {Array} films - массив объектов с данными фильмов
   */
  render(films) {
    const container = this._container.getElement();
    const topRatedFilms = getTopFilms(films, `totalRating`);
    const mostCommentedFilms = getTopFilms(films, `comments`);

    if (!films.length) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._filmListComponent, RenderPosition.BEFOREEND);

    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    renderFilms(this._filmListComponent.getElement(), films.slice(0, showingFilmsCount));

    render(this._filmListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      renderFilms(this._filmListComponent.getElement(), films.slice(prevFilmsCount, showingFilmsCount));

      if (showingFilmsCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    });

    renderTopFilms(container, topRatedFilms, `Top rated`);
    renderTopFilms(container, mostCommentedFilms, `Most commented`);
  }
}
