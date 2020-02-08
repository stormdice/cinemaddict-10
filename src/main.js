import {createProfileTemplate} from './components/profile.js';
import {createMenuTemplate} from './components/menu.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmsSectionTemplate} from './components/film-section.js';
import {createFilmsListTemplate} from './components/film-list.js';
import {createFilmTemplate} from './components/film.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createFilmDetailsTemplate} from './components/film-details.js';
import {generateFilms} from './mock/film';
import {getTopFilms} from './utils';

const FILMS_COUNT = 14;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const films = generateFilms(FILMS_COUNT);
const topRatedFilms = getTopFilms(films, `totalRating`);
const mostCommentedFilms = getTopFilms(films, `comments`);

const countMoviesAddedToWatchlist = films.filter((film) => film.isWatchlist).length;
const countOfMoviesWatched = films.filter((film) => film.isWatched).length;
const countFavoriteMovies = films.filter((film) => film.isFavorite).length;

const Menu = {
  'all': FILMS_COUNT,
  'watchlist': countMoviesAddedToWatchlist,
  'history': countOfMoviesWatched,
  'favorites': countFavoriteMovies,
  'stats': null
};

/**
 * Показывает больше фильмов
 */
const showMoreFilms = () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  films
    .slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(filmListContainer, createFilmTemplate(film)));

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
};

/**
 * Вставляет разметку в DOM
 * @param {HTMLElement} container - элемент относительно которого идёт вставка
 * @param {string} template - разметка
 * @param {string} place - позиция
 */
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createProfileTemplate(countOfMoviesWatched));
render(siteMainElement, createMenuTemplate(Menu));
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsSectionTemplate());

const filmsSection = siteMainElement.querySelector(`.films`);
render(filmsSection, createFilmsListTemplate());

const filmList = filmsSection.querySelector(`.films-list`);
const filmListContainer = filmList.querySelector(`.films-list__container`);

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

films.slice(0, showingFilmsCount).forEach((film) => render(filmListContainer, createFilmTemplate(film)));

if (showingFilmsCount >= films.length) {
  showMoreButton.remove();
}

render(filmList, createShowMoreButtonTemplate());
const showMoreButton = filmsSection.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, showMoreFilms);

if (topRatedFilms.length) {
  render(filmsSection, createFilmsListTemplate(`Top rated`));
  const topRatedSection = filmsSection.querySelectorAll(`.films-list--extra`)[0];
  const topRatedList = topRatedSection.querySelector(`.films-list__container`);
  topRatedFilms.forEach((film) => render(topRatedList, createFilmTemplate(film)));
}

if (mostCommentedFilms.length) {
  render(filmsSection, createFilmsListTemplate(`Most commented`));
  const topRatedSection = filmsSection.querySelectorAll(`.films-list--extra`)[1];
  const topRatedList = topRatedSection.querySelector(`.films-list__container`);
  mostCommentedFilms.forEach((film) => render(topRatedList, createFilmTemplate(film)));
}

document.querySelector(`.footer__statistics p`).textContent = `${FILMS_COUNT} movies inside`;

// render(document.body, createFilmDetailsTemplate(films[0]));
