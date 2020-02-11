import ProfileComponent from './components/profile.js';
import MenuComponent from './components/menu.js';
import SortComponent from './components/sort.js';
import FilmsSectionComponent from './components/film-section.js';
import FilmsListComponent from './components/film-list.js';
import FilmComponent from './components/film.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import FilmDetailsComponent from './components/film-details.js';
import NoFilmsComponent from './components/no-films';
import {generateFilms} from './mock/film';
import {render, getTopFilms, RenderPosition} from './utils';

const FILMS_COUNT = 14;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const films = generateFilms(FILMS_COUNT);
const topRatedFilms = getTopFilms(films, `totalRating`);
const mostCommentedFilms = getTopFilms(films, `comments`);

const countMoviesAddedToWatchlist = films.filter((film) => film.isWatchlist).length;
const countOfMoviesWatched = films.filter((film) => film.isWatched).length;
const countFavoriteMovies = films.filter((film) => film.isFavorite).length;

const menuItems = {
  'all': FILMS_COUNT,
  'watchlist': countMoviesAddedToWatchlist,
  'history': countOfMoviesWatched,
  'favorites': countFavoriteMovies,
  'stats': null
};

/**
 * Отрисовывает блок с лучшими фильмами
 * @param {Array} topFilms - массив фильмов
 * @param {string} title - заголовок блока
 */
const renderTopFilms = (topFilms, title) => {
  if (topFilms.length) {
    const topFilmsList = new FilmsListComponent(title).getElement();
    render(filmsSectionComponent.getElement(), topFilmsList, RenderPosition.BEFOREEND);
    topFilms.forEach((film) => render(topFilmsList.querySelector(`.films-list__container`), new FilmComponent(film).getElement(), RenderPosition.BEFOREEND));
  }
};

/**
 * Отрисовывает фильмы
 * @param {HTMLElement} filmListElement - контейнер в который будет вставлять
 * @param {Object} film - данные из объекта фильмов
 */
const renderFilms = (filmListElement, film) => {
  const filmComponent = new FilmComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      filmDetailsComponent.getElement().remove();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  let closeFilmDetailsButton = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
  closeFilmDetailsButton.addEventListener(`click`, () => {
    filmDetailsComponent.getElement().remove();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  const poster = filmComponent.getElement().querySelector(`.film-card__poster`);
  const title = filmComponent.getElement().querySelector(`.film-card__title`);
  const comments = filmComponent.getElement().querySelector(`.film-card__comments`);

  filmComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();

    if (evt.target === poster || title || comments) {
      render(document.body, filmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
    }

    document.addEventListener(`keydown`, onEscKeyDown);
  });

  render(filmListElement.querySelector(`.films-list__container`), filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new ProfileComponent(countOfMoviesWatched).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuComponent(menuItems).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);

const filmsSectionComponent = new FilmsSectionComponent();
render(siteMainElement, filmsSectionComponent.getElement(), RenderPosition.BEFOREEND);

if (!films.length) {
  render(siteMainElement, new NoFilmsComponent().getElement(), RenderPosition.BEFOREEND);
} else {
  const filmListComponent = new FilmsListComponent();
  render(filmsSectionComponent.getElement(), filmListComponent.getElement(), RenderPosition.BEFOREEND);

  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

  films.slice(0, showingFilmsCount).forEach((film) => renderFilms(filmListComponent.getElement(), film));

  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(filmListComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    films
      .slice(prevFilmsCount, showingFilmsCount)
      .forEach((film) => renderFilms(filmListComponent.getElement(), film));

    if (showingFilmsCount >= films.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });

  renderTopFilms(topRatedFilms, `Top rated`);
  renderTopFilms(mostCommentedFilms, `Most commented`);
}

document.querySelector(`.footer__statistics p`).textContent = `${FILMS_COUNT} movies inside`;
