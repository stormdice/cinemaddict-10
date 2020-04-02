import API from './api';
import ProfileController from './controllers/profile-controller';
import MenuController from './controllers/menu-controller';
import PageController from './controllers/page-controller';
import FilmsSectionComponent from './components/film-section';
import StatisticsComponent from './components/statistics';
import MoviesModel from './models/movies';
import {RenderPosition, render} from './utils/render';

const AUTHORIZATION = `Basic stormdicedsafgkljh`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION);
const moviesModel = new MoviesModel();

const filmsSectionLoadingMarkup = `<p class="films__loading-text">Loading...</p>`;
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerFilmsCount = document.querySelector(`.footer__statistics p`);

const profileController = new ProfileController(siteHeaderElement, moviesModel);
const menuController = new MenuController(siteMainElement, moviesModel);
const filmsSectionComponent = new FilmsSectionComponent();
const statisticsComponent = new StatisticsComponent({films: moviesModel});

menuController.render();
profileController.render();
filmsSectionComponent.getElement().innerHTML = filmsSectionLoadingMarkup;
render(siteMainElement, filmsSectionComponent, RenderPosition.BEFOREEND);
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

const pageController = new PageController(filmsSectionComponent, moviesModel);

menuController.setScreenChange((filterName) => {
  if (filterName === `stats`) {
    pageController.hide();
    statisticsComponent.show();
  } else {
    pageController.show();
    menuController.onFilterChange(filterName);
    statisticsComponent.hide();
  }
});

api.getMovies()
  .then((movies) => {
    filmsSectionComponent.getElement().innerHTML = ``;
    moviesModel.films = movies;
    pageController.render();

    footerFilmsCount.textContent = `${moviesModel.films.length} movies inside`;
  });
