import FilmsBoardComponent from '../components/films-board';
import FilmsListComponent from '../components/films-list';
import FilmDetailsComponent from '../components/film-details';
import FilmCardComponent from '../components/film-card';
import ShowMoreButtonComponent from '../components/show-more';
import FilmsContainerComponent from '../components/films-container';
import FilmListExtraComponent from '../components/film-list-extra';
import SortComponent, {SortType} from '../components/sort';
import {EXTRA_FILMS_LIMIT} from '../const';
import {render, remove, RenderPosition} from '../utils/render';

const footerElement = document.querySelector(`.footer`);
const SHOWING_FILMS_ON_START = 5;
const SHOWING_FILMS_BY_BUTTON = 5;

const renderFilm = (filmListContainer, film) => {
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

const renderFilms = (filmsContainer, films) => {
  films.forEach((film) => renderFilm(filmsContainer.getElement(), film));
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._sortComponent = new SortComponent();
    this._filmsBoard = new FilmsBoardComponent();
    this._filmsContainer = new FilmsContainerComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(films) {
    const renderShowMoreButton = () => {
      if (showingFilmsCount >= films.length) {
        return;
      }

      render(filmsListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      this._showMoreButtonComponent.setClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;

        showingFilmsCount = showingFilmsCount + SHOWING_FILMS_BY_BUTTON;

        films.slice(prevFilmsCount, showingFilmsCount)
        .forEach((film) => renderFilm(this._filmsContainer.getElement(), film));

        if (showingFilmsCount >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._filmsBoard, RenderPosition.BEFOREEND);

    const filmsListComponent = new FilmsListComponent(films.length);
    render(this._filmsBoard.getElement(), filmsListComponent, RenderPosition.BEFOREEND);

    if (!films.length) {
      return;
    }

    let showingFilmsCount = SHOWING_FILMS_ON_START;
    render(filmsListComponent.getElement(), this._filmsContainer, RenderPosition.BEFOREEND);

    renderFilms(this._filmsContainer, films.slice(0, showingFilmsCount));
    renderShowMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedFilms = [];

      switch (sortType) {
        case SortType.DEFAULT:
          sortedFilms = films.slice(0, showingFilmsCount);
          break;
        case SortType.DATE:
          sortedFilms = films.slice().sort((a, b) => b.release.date - a.release.date);
          break;
        case SortType.RATING:
          sortedFilms = films.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
          break;
      }

      this._filmsContainer.getElement().innerHTML = ``;

      renderFilms(this._filmsContainer, sortedFilms);

      if (sortType === SortType.DEFAULT) {
        renderShowMoreButton();
      } else {
        remove(this._showMoreButtonComponent);
      }
    });

    const sortedByRating = films.sort((a, b) => {
      return b.filmInfo.totalRating - a.filmInfo.totalRating;
    }).slice(0, EXTRA_FILMS_LIMIT);

    const sortedByComments = films.sort((a, b) => {
      return b.comments - a.comments;
    }).slice(0, EXTRA_FILMS_LIMIT);

    const topRatedFilmsComponent = new FilmListExtraComponent(`Top rated`);
    render(this._filmsBoard.getElement(), topRatedFilmsComponent, RenderPosition.BEFOREEND);
    const topRatedFilmsContainer = topRatedFilmsComponent.getElement().querySelector(`.films-list__container`);
    sortedByRating.forEach((film) => renderFilm(topRatedFilmsContainer, film));

    const mostCommentedComponent = new FilmListExtraComponent(`Most commented`);
    render(this._filmsBoard.getElement(), mostCommentedComponent, RenderPosition.BEFOREEND);
    const mostCommentedFilmsContainer = mostCommentedComponent.getElement().querySelector(`.films-list__container`);
    sortedByComments.forEach((film) => renderFilm(mostCommentedFilmsContainer, film));

    footerElement.querySelector(`p`).textContent = `${films.length} movies inside`;
  }
}
