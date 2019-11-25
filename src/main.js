import {getProfileTemplate} from './components/profile';
import {navigationLinksData} from './components/data';
import {getNavigationTemplate} from './components/navigation';
import {sortLinksData} from './components/data';
import {getSortTemplate} from './components/sort';
import {filmCardsData} from './components/data';
import {getFilmsSectionTemplate} from './components/films-section';
import {getFilmDetailsTemplate} from './components/film-details';
import {render} from './components/utils';

/**
 * Запускает приложение
 */
const initApp = () => {
  const mainElement = document.querySelector(`.main`);
  const headerElement = document.querySelector(`.header`);
  const footerElement = document.querySelector(`.footer`);

  render(headerElement, getProfileTemplate());
  render(mainElement, getNavigationTemplate(navigationLinksData));
  render(mainElement, getSortTemplate(sortLinksData));
  render(mainElement, getFilmsSectionTemplate(filmCardsData));
  render(footerElement, getFilmDetailsTemplate(), `afterend`);
};

initApp();
