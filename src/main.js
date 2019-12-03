import {getProfileTemplate} from './components/profile';
import {menuLinksData} from './data/menu-links';
import {getMenuTemplate} from './components/menu';
import {sortLinksData} from './data/sort-links';
import {getSortTemplate} from './components/sort';
import {filmCardsData} from './data/film-cards';
import {getFilmsSectionTemplate} from './components/film-section';
import {render} from './utils';
import {filmListExtraData} from './data/film-cards';
import {getFilmDetailsTemplate} from './components/film-details';

/**
 * Запускает приложение
 */
const initApp = () => {
  const mainElement = document.querySelector(`.main`);
  const headerElement = document.querySelector(`.header`);
  const footerElement = document.querySelector(`.footer`);

  render(headerElement, getProfileTemplate());
  render(mainElement, getMenuTemplate(menuLinksData));
  render(mainElement, getSortTemplate(sortLinksData));
  render(mainElement, getFilmsSectionTemplate(filmCardsData, filmListExtraData));
  render(footerElement, getFilmDetailsTemplate(), `afterend`);
};

initApp();
