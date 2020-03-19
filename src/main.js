import API from './api.js';
import ProfileController from './controllers/profile-controller.js';
import MenuController from './controllers/menu-controller.js';
import PageController from './controllers/page-controller.js';
import FilmsSectionComponent from './components/film-section.js';
import StatisticsComponent from './components/statistics.js';
import MoviesModel from './models/movies.js';
import {RenderPosition, render} from './utils/render.js';

const AUTHORIZATION = `Basic stormdiceCinema`;
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
let statisticsComponent = null;
render(siteMainElement, filmsSectionComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(filmsSectionComponent, moviesModel, api);

menuController.setScreenChange((filterName) => {
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
    menuController.onFilterChange(filterName);

    if (statisticsComponent === null) {
      return;
    } else {
      statisticsComponent.hide();
    }
  }
});

api.getMovies()
  .then((movies) => {
    const commentsPromises = movies.map((movie) => {
      return api.getComments(movie.id)
        .then((commentList) => {
          movie.comments = commentList;
        });
    });

    Promise.all(commentsPromises)
      .then(() => {
        moviesModel.films = movies;

        profileController.render();
        menuController.render();
        pageController.render();

        footerFilmsCount.textContent = `${moviesModel.films.length} movies inside`;
      });
  });
