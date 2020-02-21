import ProfileComponent from './components/profile.js';
import FilterController from './controllers/filter-controller.js';
import FilmsSectionComponent from './components/film-section.js';
import PageController from './controllers/page-controller.js';
import MoviesModel from './models/movies.js';
import {generateFilms} from './mock/film.js';
import {RenderPosition, render} from './utils/render.js';

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new ProfileComponent(1), RenderPosition.BEFOREEND);

const FILMS_COUNT = 8;
const films = generateFilms(FILMS_COUNT);
const moviesModel = new MoviesModel();
moviesModel.films = films;

const filterController = new FilterController(siteMainElement, moviesModel);
filterController.render();

const filmsSectionComponent = new FilmsSectionComponent();
render(siteMainElement, filmsSectionComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(filmsSectionComponent, moviesModel);
pageController.render();

document.querySelector(`.footer__statistics p`).textContent = `${FILMS_COUNT} movies inside`;
