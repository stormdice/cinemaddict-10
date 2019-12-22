import ProfileComponent from './components/profile';
import MenuComponent from './components/menu';
import SortComponent from './components/sort';
import FilmsBoardComponent from './components/films-board';
import FilmsListComponent from './components/films-list';
import ShowMoreComponent from './components/show-more';
import FilmDetailsComponent from './components/film-details';
import FilmCardComponent from './components/film-card';
import NoFilmsComponent from './components/no-films';
import {menuLinksData} from './data/menu-links';
import {sortLinksData} from './data/sort-links';
import {generateFilms} from './mock/film-card';
import {filmListings} from './data/film-lists';
import {render, RenderPosition} from './utils';

const FILM_COUNT = 13;
const SHOWING_FILMS_ON_START = 5;
const SHOWING_FILMS_BY_BUTTON = 5;

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);
const footerElement = document.querySelector(`.footer`);

const renderFilms = (filmListContainer, film) => {
  const filmComponent = new FilmCardComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  const poster = filmComponent.getElement().querySelector(`.film-card__poster`);
  const title = filmComponent.getElement().querySelector(`.film-card__title`);
  const comments = filmComponent.getElement().querySelector(`.film-card__comments`);
  const closePopup = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      filmDetailsComponent.getElement().remove();
      filmDetailsComponent.removeElement();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  closePopup.addEventListener(`click`, () => {
    filmDetailsComponent.getElement().remove();
    filmDetailsComponent.removeElement();
  });

  filmComponent.getElement().addEventListener(`click`, (evt) => {
    if ((evt.target === poster) || (evt.target === title) || (evt.target === comments)) {
      render(footerElement, filmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeyDown);
    }
  });

  render(filmListContainer, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderFilmsBoard = (filmsBoard, films) => {
  filmListings.forEach((list) => {
    const filmList = new FilmsListComponent(list);

    if (films.length === 0) {
      render(filmsBoard.getElement(), new NoFilmsComponent().getElement(), RenderPosition.BEFOREEND);
    } else {
      const filmListContainer = filmList.getElement().querySelector(`.films-list__container`);
      let showingFilmsCount = SHOWING_FILMS_ON_START;

      render(filmsBoard.getElement(), filmList.getElement(), RenderPosition.BEFOREEND);

      films.slice(0, showingFilmsCount)
        .forEach((film) => renderFilms(filmListContainer, film));

      const showMoreButton = new ShowMoreComponent();
      render(filmList.getElement(), showMoreButton.getElement(), RenderPosition.BEFOREEND);

      showMoreButton.getElement().addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const prevFilmsCount = showingFilmsCount;

        showingFilmsCount = showingFilmsCount + SHOWING_FILMS_BY_BUTTON;

        films.slice(prevFilmsCount, showingFilmsCount)
        .forEach((film) => renderFilms(filmListContainer, film));

        if (showingFilmsCount >= films.length) {
          showMoreButton.getElement().remove();
          showMoreButton.removeElement();
        }
      });
    }
  });
};

render(headerElement, new ProfileComponent().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new MenuComponent(menuLinksData).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SortComponent(sortLinksData).getElement(), RenderPosition.BEFOREEND);

const filmsBoard = new FilmsBoardComponent();
render(mainElement, filmsBoard.getElement(), RenderPosition.BEFOREEND);

const films = generateFilms(FILM_COUNT);
renderFilmsBoard(filmsBoard, films);

footerElement.querySelector(`.footer__statistics p`).textContent = `${FILM_COUNT} movies inside`;
