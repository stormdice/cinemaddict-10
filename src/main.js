import {getProfileTemplate} from './components/profile';
import {menuLinksData} from './data/menu-links';
import {getMenuTemplate} from './components/menu';
import {sortLinksData} from './data/sort-links';
import {getSortTemplate} from './components/sort';
import {getFilmsSectionTemplate} from './components/film-section';
import {render} from './utils';
import {filmListExtraData} from './data/film-card';
import {getFilmDetailsTemplate} from './components/film-details';
import {filmDetails} from './data/film-details';
import {FILM_COUNT} from './data/film-card';
import {films} from './data/film-card';

import {getFilmCardTemplate} from './components/film-card';

const SHOWING_FILMS_ON_START = 5;
const SHOWING_FILMS_BY_BUTTON = 5;

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);
const footerElement = document.querySelector(`.footer`);

render(headerElement, getProfileTemplate());
render(mainElement, getMenuTemplate(menuLinksData));
render(mainElement, getSortTemplate(sortLinksData));
render(mainElement, getFilmsSectionTemplate(filmListExtraData));
render(footerElement, getFilmDetailsTemplate(filmDetails), `afterend`);

const loadMoreButton = mainElement.querySelector(`.films-list__show-more`);
const filmList = mainElement.querySelector(`.films-list__container`);
let showingFilmsCount = SHOWING_FILMS_ON_START;

/**
 * Возвращает разметку карточек фильмов
 * @param {Array} start - начальный индекс массива
 * @param {Array} end - конечный индекс массива
 * @return {String}
 */
const renderFilms = (start, end) => {
  return films.slice(start, end).map(getFilmCardTemplate).join(``);
};

render(filmList, renderFilms(0, showingFilmsCount));

loadMoreButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  const prevFilmsCount = showingFilmsCount;

  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_BY_BUTTON;

  render(filmList, renderFilms(prevFilmsCount, showingFilmsCount));

  if (showingFilmsCount >= films.length) {
    loadMoreButton.remove();
  }
});

footerElement.querySelector(`.footer__statistics p`).textContent = `${FILM_COUNT} movies inside`;
