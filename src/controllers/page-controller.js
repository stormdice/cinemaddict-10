import FilmsListComponent from '../components/films-list';
import FilmDetailsComponent from '../components/film-details';
import FilmCardComponent from '../components/film-card';
import ShowMoreButtonComponent from '../components/show-more';
import FilmsContainerComponent from '../components/films-container';
import FilmListExtraComponent from '../components/film-list-extra';
import {EXTRA_FILMS_LIMIT} from '../const';
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
    const filmList = new FilmsListComponent(films.length);
    render(this._container.getElement(), filmList, RenderPosition.BEFOREEND);

    if (!films.length) {
      return;
    }

    const filmContainer = new FilmsContainerComponent();
    let showingFilmsCount = SHOWING_FILMS_ON_START;
    render(filmList.getElement(), filmContainer, RenderPosition.BEFOREEND);

    films.slice(0, showingFilmsCount)
      .forEach((film) => renderFilms(filmContainer.getElement(), film));

    const showMoreButtonComponent = new ShowMoreButtonComponent();
    render(filmList.getElement(), showMoreButtonComponent, RenderPosition.BEFOREEND);

    showMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = showingFilmsCount;

      showingFilmsCount = showingFilmsCount + SHOWING_FILMS_BY_BUTTON;

      films.slice(prevFilmsCount, showingFilmsCount)
      .forEach((film) => renderFilms(filmContainer.getElement(), film));

      if (showingFilmsCount >= films.length) {
        remove(showMoreButtonComponent);
      }
    });

    const sortedByRating = films.sort((a, b) => {
      return b.filmInfo.totalRating - a.filmInfo.totalRating;
    }).slice(0, EXTRA_FILMS_LIMIT);

    const sortedByComments = films.sort((a, b) => {
      return b.comments - a.comments;
    }).slice(0, EXTRA_FILMS_LIMIT);

    const topRatedFilmsComponent = new FilmListExtraComponent(`Top rated`);
    render(this._container.getElement(), topRatedFilmsComponent, RenderPosition.BEFOREEND);
    const topRatedFilmsContainer = topRatedFilmsComponent.getElement().querySelector(`.films-list__container`);
    sortedByRating.forEach((film) => renderFilms(topRatedFilmsContainer, film));

    const mostCommentedComponent = new FilmListExtraComponent(`Most commented`);
    render(this._container.getElement(), mostCommentedComponent, RenderPosition.BEFOREEND);
    const mostCommentedFilmsContainer = mostCommentedComponent.getElement().querySelector(`.films-list__container`);
    sortedByComments.forEach((film) => renderFilms(mostCommentedFilmsContainer, film));

    footerElement.querySelector(`p`).textContent = `${films.length} movies inside`;
  }
}
