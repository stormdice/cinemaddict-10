import ProfileComponent from './components/profile.js';
import MenuComponent from './components/menu.js';
import FilmsSectionComponent from './components/film-section.js';
import PageController from './controllers/page-controller.js';
import {generateFilms} from './mock/film.js';
import {RenderPosition, render} from './utils/render.js';

const FILMS_COUNT = 8;

const films = generateFilms(FILMS_COUNT);

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

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new ProfileComponent(countOfMoviesWatched), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuComponent(menuItems), RenderPosition.BEFOREEND);

const filmsSectionComponent = new FilmsSectionComponent();
render(siteMainElement, filmsSectionComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(filmsSectionComponent);
pageController.render(films);

document.querySelector(`.footer__statistics p`).textContent = `${FILMS_COUNT} movies inside`;
