import API from './api';
import ProfileController from './controllers/profile-controller';
import MenuController from './controllers/menu-controller';
import PageController from './controllers/page-controller';
import FilmsSectionComponent from './components/film-section';
import StatisticsController from './controllers/statistics-controller';
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
profileController.render();

const menuController = new MenuController(siteMainElement, moviesModel);
menuController.render();

const filmsSectionComponent = new FilmsSectionComponent();
filmsSectionComponent.getElement().innerHTML = filmsSectionLoadingMarkup;

const statisticsController = new StatisticsController(siteMainElement, moviesModel);

render(siteMainElement, filmsSectionComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(filmsSectionComponent, moviesModel);

menuController.setScreenChange((filterName) => {
  if (filterName === `stats`) {
    pageController.hide();

    if (statisticsController._statisticsComponent === null) {
      statisticsController.render();
    } else {
      statisticsController.show();
    }

  } else {
    pageController.show();
    menuController.onFilterChange(filterName);
    statisticsController.hide();
  }
});

api.getMovies()
  .then((movies) => {
    filmsSectionComponent.getElement().innerHTML = ``;
    moviesModel.films = movies;
    profileController.render();
    menuController.render();
    pageController.render();

    footerFilmsCount.textContent = `${moviesModel.films.length} movies inside`;
  });
