import Api from "./api/index";
import Store from "./api/store";
import Provider from "./api/provider";
import ProfileController from "./controllers/profile-controller";
import MenuController from "./controllers/menu-controller";
import PageController from "./controllers/page-controller";
import FilmsSectionComponent from "./components/film-section";
import FilmsListLoadingComponent from "./components/films-loading";
import StatisticsComponent from "./components/statistics";
import MoviesModel from "./models/movies";
import {RenderPosition, render} from "./utils/render";

const STORE_PREFIX = `cinemaaddict-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;
const AUTHORIZATION = `Basic sadasdlkjdlfkjasdlkkljhslgkjalksdjfl;ksdjf`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const moviesModel = new MoviesModel();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerFilmsCount = document.querySelector(`.footer__statistics p`);

const profileController = new ProfileController(siteHeaderElement, moviesModel);
const menuController = new MenuController(siteMainElement, moviesModel);
const filmsSectionComponent = new FilmsSectionComponent();
const statisticsComponent = new StatisticsComponent(moviesModel);
const filmsListLoadingComponent = new FilmsListLoadingComponent(`Loading...`);

menuController.render();
profileController.render();
render(siteMainElement, filmsSectionComponent, RenderPosition.BEFOREEND);
render(
    filmsSectionComponent.getElement(),
    filmsListLoadingComponent,
    RenderPosition.BEFOREEND
);
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

const pageController = new PageController(
    filmsSectionComponent,
    moviesModel,
    apiWithProvider
);

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

apiWithProvider.getMovies().then((movies) => {
  filmsListLoadingComponent.getElement().remove();
  filmsListLoadingComponent.removeElement();

  moviesModel.films = movies;
  pageController.render();

  footerFilmsCount.textContent = `${moviesModel.films.length} movies inside`;
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
});

if (!apiWithProvider.getSynchronize()) {
  apiWithProvider.sync();
}

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
