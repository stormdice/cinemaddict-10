import FilmsListComponent from '../components/films-list';
import FilmDetailsComponent from '../components/film-details';
import FilmCardComponent from '../components/film-card';
import ShowMoreButtonComponent from '../components/show-more';
import NoFilmsComponent from '../components/no-films';
import {filmListings} from '../data/film-lists';
import {render, remove, RenderPosition} from '../utils/render';

const footerElement = document.querySelector(`.footer`);
const SHOWING_FILMS_ON_START = 5;
const SHOWING_FILMS_BY_BUTTON = 5;

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
      remove(filmDetailsComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  closePopup.addEventListener(`click`, () => {
    remove(filmDetailsComponent);
  });

  filmComponent.setOpenDetailsClickHandler((evt) => {
    if ((evt.target === poster) || (evt.target === title) || (evt.target === comments)) {
      render(footerElement, filmDetailsComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeyDown);
    }
  });

  render(filmListContainer, filmComponent, RenderPosition.BEFOREEND);
};

export default class PageController {
  constructor(container) {
    this._container = container;
  }

  render(films) {
    filmListings.forEach((list) => {
      const filmList = new FilmsListComponent(list);

      if (films.length === 0) {
        render(this._container.getElement(), new NoFilmsComponent(), RenderPosition.BEFOREEND);
      } else {
        const filmListContainer = filmList.getElement().querySelector(`.films-list__container`);
        let showingFilmsCount = SHOWING_FILMS_ON_START;

        render(this._container.getElement(), filmList, RenderPosition.BEFOREEND);

        films.slice(0, showingFilmsCount)
          .forEach((film) => renderFilms(filmListContainer, film));

        const showMoreButtonComponent = new ShowMoreButtonComponent();
        render(filmList.getElement(), showMoreButtonComponent, RenderPosition.BEFOREEND);

        showMoreButtonComponent.setClickHandler(() => {
          const prevFilmsCount = showingFilmsCount;

          showingFilmsCount = showingFilmsCount + SHOWING_FILMS_BY_BUTTON;

          films.slice(prevFilmsCount, showingFilmsCount)
          .forEach((film) => renderFilms(filmListContainer, film));

          if (showingFilmsCount >= films.length) {
            remove(showingFilmsCount);
          }
        });
      }
    });
  }
}
