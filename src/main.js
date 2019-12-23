import ProfileComponent from './components/profile';
import MenuComponent from './components/menu';
import SortComponent from './components/sort';
import FilmsBoardComponent from './components/films-board';
import PageController from './controllers/page-controller';
import {menuLinksData} from './data/menu-links';
import {sortLinksData} from './data/sort-links';
import {generateFilms} from './mock/film-card';
import {render, RenderPosition} from './utils/render';

const FILM_COUNT = 13;
const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);

render(headerElement, new ProfileComponent(), RenderPosition.BEFOREEND);
render(mainElement, new MenuComponent(menuLinksData), RenderPosition.BEFOREEND);
render(mainElement, new SortComponent(sortLinksData), RenderPosition.BEFOREEND);

const filmsBoard = new FilmsBoardComponent();
render(mainElement, filmsBoard, RenderPosition.BEFOREEND);

const films = generateFilms(FILM_COUNT);
const pageController = new PageController(filmsBoard);

pageController.render(films);
