import API from './api';
import ProfileController from './controllers/profile-controller';
import MenuController from './controllers/menu-controller';
import PageController from './controllers/page-controller';
import FilmsSectionComponent from './components/film-section';
import StatisticsController from './controllers/statistics-controller';
import MoviesModel from './models/movies';
import {RenderPosition, render} from './utils/render';

const AUTHORIZATION = `Basic stormdice`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION);
const moviesModel = new MoviesModel();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerFilmsCount = document.querySelector(`.footer__statistics p`);

const profileController = new ProfileController(siteHeaderElement, moviesModel);
profileController.render();

const menuController = new MenuController(siteMainElement, moviesModel);
menuController.render();

const filmsSectionComponent = new FilmsSectionComponent();
const statisticsController = new StatisticsController(siteMainElement, moviesModel);

render(siteMainElement, filmsSectionComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(filmsSectionComponent, moviesModel);

menuController.setScreenChange((filterName) => {
  if (filterName === `stats`) {
    pageController.hide();
    statisticsController.render();
    statisticsController._statisticsComponent.show();
  } else {
    pageController.show();
    menuController.onFilterChange(filterName);
    statisticsController._statisticsComponent.hide();
  }
});

api.getMovies()
  .then((movies) => {
    moviesModel.films = movies;
    profileController.render();
    menuController.render();
    pageController.render();

    footerFilmsCount.textContent = `${moviesModel.films.length} movies inside`;
  });
