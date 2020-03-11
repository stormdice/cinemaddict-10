import ProfileComponent from './components/profile.js';
import FilterController from './controllers/filter-controller.js';
import PageController from './controllers/page-controller.js';
import FilmsSectionComponent from './components/film-section.js';
import StatisticsComponent from './components/statistics.js';
import MoviesModel from './models/movies.js';
import {generateFilms} from './mock/film.js';
import {RenderPosition, render} from './utils/render.js';

const FILMS_COUNT = 16;
const films = generateFilms(FILMS_COUNT);
const moviesModel = new MoviesModel();
moviesModel.films = films;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new ProfileComponent(moviesModel.watchedFilms.length), RenderPosition.BEFOREEND);

const filterController = new FilterController(siteMainElement, moviesModel);
filterController.render();

const filmsSectionComponent = new FilmsSectionComponent();
const statisticsComponent = new StatisticsComponent(moviesModel.watchedFilms);
render(siteMainElement, filmsSectionComponent, RenderPosition.BEFOREEND);
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(filmsSectionComponent, moviesModel);
statisticsComponent.hide();
pageController.render();

document.querySelector(`.footer__statistics p`).textContent = `${FILMS_COUNT} movies inside`;

filterController._filterComponent.setClickHandler((filterName) => {
  if (filterName === `stats`) {
    pageController.hide();
    statisticsComponent.show();
  } else {
    pageController.show();
    statisticsComponent.hide();
    filterController.onFilterChange(filterName);
  }
});
