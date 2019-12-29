import ProfileComponent from './components/profile';
import MenuComponent from './components/menu';
import PageController from './controllers/page-controller';
import {menuLinksData} from './data/menu-links';
import {generateFilms} from './mock/film-card';
import {render, RenderPosition} from './utils/render';

const FILM_COUNT = 8;
const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);

render(headerElement, new ProfileComponent(), RenderPosition.BEFOREEND);
render(mainElement, new MenuComponent(menuLinksData), RenderPosition.BEFOREEND);

const films = generateFilms(FILM_COUNT);
const pageController = new PageController(mainElement);

pageController.render(films);
