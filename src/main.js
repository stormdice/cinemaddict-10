import ProfileComponent from './components/profile.js';
import FooterComponent from './components/footer.js';
import FilterController from './controllers/filter-controller.js';
import PageController from './controllers/page-controller.js';
import FilmsSectionComponent from './components/film-section.js';
import StatisticsComponent from './components/statistics.js';
import MoviesModel from './models/movies.js';
import {generateFilms} from './mock/film.js';
import {RenderPosition, render} from './utils/render.js';

const FILMS_COUNT = 40;
const films = generateFilms(FILMS_COUNT);
const moviesModel = new MoviesModel();
moviesModel.films = films;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new ProfileComponent(moviesModel.watchedFilms.length), RenderPosition.BEFOREEND);

const filterController = new FilterController(siteMainElement, moviesModel);
filterController.render();

const filmsSectionComponent = new FilmsSectionComponent();
let statisticsComponent = null;
render(siteMainElement, filmsSectionComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(filmsSectionComponent, moviesModel);
pageController.render();

const footerComponent = new FooterComponent(moviesModel.allFilms.length);
render(siteMainElement, footerComponent, RenderPosition.BEFOREEND);

filterController.setScreenChange((filterName) => {
  if (filterName === `stats`) {
    pageController.hide();

    if (statisticsComponent === null) {
      statisticsComponent = new StatisticsComponent(moviesModel.watchedFilms);
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
    } else {
      statisticsComponent.show();
    }

  } else {
    pageController.show();
    filterController.onFilterChange(filterName);

    if (statisticsComponent === null) {
      return;
    } else {
      statisticsComponent.hide();
    }
  }
});
