import ProfileComponent from './components/profile';
import {menuLinksData} from './data/menu-links';
import MenuComponent from './components/menu';
import {sortLinksData} from './data/sort-links';
import SortComponent from './components/sort';
import FilmsBoardComponent from './components/films-board';
import FilmsListComponent from './components/films-list';
import ShowMoreComponent from './components/show-more';
import FilmListExtraComponent from './components/film-list-extra';
import {films, filmListExtraData, FILM_COUNT} from './data/film-card';
import FilmDetailsComponent from './components/film-details';
import {filmDetails} from './data/film-details';
import {render, RenderPosition} from './utils';
import FilmCardComponent from './components/film-card';

const SHOWING_FILMS_ON_START = 5;
const SHOWING_FILMS_BY_BUTTON = 5;

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);
const footerElement = document.querySelector(`.footer`);

const renderFilms = (film) => {
  const filmComponent = new FilmCardComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(filmDetails);

  const poster = filmComponent.getElement().querySelector(`.film-card__poster`);
  const title = filmComponent.getElement().querySelector(`.film-card__title`);
  const comments = filmComponent.getElement().querySelector(`.film-card__comments`);
  const closePopup = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      filmDetailsComponent.getElement().remove();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  closePopup.addEventListener(`click`, () => {
    filmDetailsComponent.getElement().remove();
  });

  filmComponent.getElement().addEventListener(`click`, (evt) => {
    if ((evt.target === poster) || (evt.target === title) || (evt.target === comments)) {
      render(footerElement, filmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeyDown);
    }
  });

  render(filmListContainer, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

render(
    headerElement,
    new ProfileComponent().getElement(),
    RenderPosition.BEFOREEND
);
render(mainElement, new MenuComponent(menuLinksData).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SortComponent(sortLinksData).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new FilmsBoardComponent().getElement(), RenderPosition.BEFOREEND);

const filmsBoard = mainElement.querySelector(`.films`);
render(filmsBoard, new FilmsListComponent().getElement(), RenderPosition.BEFOREEND);

const filmsList = filmsBoard.querySelector(`.films-list`);
const filmListContainer = filmsList.querySelector(`.films-list__container`);
let showingFilmsCount = SHOWING_FILMS_ON_START;

films.slice(0, showingFilmsCount)
  .forEach((film) => renderFilms(film));

render(filmsList, new ShowMoreComponent().getElement(), RenderPosition.BEFOREEND);

filmListExtraData.forEach((list) => render(filmsBoard, new FilmListExtraComponent(list).getElement(), RenderPosition.BEFOREEND));

const loadMoreButton = mainElement.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  const prevFilmsCount = showingFilmsCount;

  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount)
  .forEach((film) => renderFilms(film));

  if (showingFilmsCount >= films.length) {
    loadMoreButton.remove();
  }
});

footerElement.querySelector(`.footer__statistics p`).textContent = `${FILM_COUNT} movies inside`;
