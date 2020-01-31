import {createProfileTemplate} from './components/profile.js';
import {createMenuTemplate} from './components/menu.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmsSectionTemplate} from './components/film-section.js';
import {createFilmsListTemplate} from './components/film-list.js';
import {createFilmTemplate} from './components/film.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createFilmsListExtraTemplate} from './components/film-extra.js';
import {createFilmDetailsTemplate} from './components/film-details.js';

const FILMS_COUNT = 5;

/**
 * Вставляет разметку в DOM
 * @param {HTMLElement} container - элемент относительно которого идёт вставка
 * @param {string} template - разметка
 * @param {string} place - позиция
 */
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createProfileTemplate());
render(siteMainElement, createMenuTemplate());
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsSectionTemplate());

const filmsSection = siteMainElement.querySelector(`.films`);
render(filmsSection, createFilmsListTemplate());

const filmList = filmsSection.querySelector(`.films-list`);
const filmListContainer = filmList.querySelector(`.films-list__container`);

for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmListContainer, createFilmTemplate());
}

render(filmList, createShowMoreButtonTemplate());
render(filmsSection, createFilmsListExtraTemplate());
render(filmsSection, createFilmsListExtraTemplate());
render(document.body, createFilmDetailsTemplate());
