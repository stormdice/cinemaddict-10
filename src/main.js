import {nanoid} from 'nanoid';
import Api from './api/index';
import Store from './api/store';
import Provider from './api/provider';
import ProfileController from './controllers/profile-controller';
import MenuController from './controllers/menu-controller';
import PageController from './controllers/page-controller';
import FilmsSectionComponent from './components/film-section';
import StatisticsComponent from './components/statistics';
import MoviesModel from './models/movies';
import {RenderPosition, render} from './utils/render';

const STORE_PREFIX = `cinemaaddict-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;
const AUTHORIZATION = `Basic stormdice${nanoid()}`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      document.title += ` [SW]`;
    }).catch(() => {
      document.title += ` [no SW]`;
    });
});

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const moviesModel = new MoviesModel();

const filmsSectionLoadingMarkup = `<p class="films__loading-text">Loading...</p>`;
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerFilmsCount = document.querySelector(`.footer__statistics p`);

const profileController = new ProfileController(siteHeaderElement, moviesModel);
const menuController = new MenuController(siteMainElement, moviesModel);
const filmsSectionComponent = new FilmsSectionComponent();
const statisticsComponent = new StatisticsComponent(moviesModel);

menuController.render();
profileController.render();
filmsSectionComponent.getElement().innerHTML = filmsSectionLoadingMarkup;
render(siteMainElement, filmsSectionComponent, RenderPosition.BEFOREEND);
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

const pageController = new PageController(filmsSectionComponent, moviesModel, apiWithProvider);

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

apiWithProvider.getMovies()
  .then((movies) => {
    filmsSectionComponent.getElement().innerHTML = ``;
    moviesModel.films = movies;
    pageController.render();

    footerFilmsCount.textContent = `${moviesModel.films.length} movies inside`;
  });
