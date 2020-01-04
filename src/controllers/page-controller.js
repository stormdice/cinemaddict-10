import FilmsBoardComponent from '../components/films-board';
import FilmsListComponent from '../components/films-list';
import MovieController from './movie-controller';
import ShowMoreButtonComponent from '../components/show-more';
import FilmsContainerComponent from '../components/films-container';
import FilmListExtraComponent from '../components/film-list-extra';
import SortComponent, {SortType} from '../components/sort';
import {render, remove, RenderPosition} from '../utils/render';

const footerElement = document.querySelector(`.footer`);
const SHOWING_FILMS_ON_START = 5;
const SHOWING_FILMS_BY_BUTTON = 5;

const renderFilms = (filmsContainer, films) => {
  return films.map((film) => {
    const movieController = new MovieController(filmsContainer);
    movieController.render(film);

    return movieController;
  });
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

        renderFilms(this._filmsContainer.getElement(), films.slice(prevFilmsCount, showingFilmsCount));

        if (showingFilmsCount >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    const renderTopFilms = (data, title) => {
      const EXTRA_FILMS_LIMIT = 2;
      const sortedFilms = films.sort((a, b) => {
        return b[data] - a[data];
      }).slice(0, EXTRA_FILMS_LIMIT);

      const topFilmsComponent = new FilmListExtraComponent(title);
      render(this._filmsBoard.getElement(), topFilmsComponent, RenderPosition.BEFOREEND);
      const topFilmsContainer = topFilmsComponent.getElement().querySelector(`.films-list__container`);
      renderFilms(topFilmsContainer, sortedFilms);
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

    renderFilms(this._filmsContainer.getElement(), films.slice(0, showingFilmsCount));
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

      renderFilms(this._filmsContainer.getElement(), sortedFilms);

      if (sortType === SortType.DEFAULT) {
        renderShowMoreButton();
      } else {
        remove(this._showMoreButtonComponent);
      }
    });

    renderTopFilms(`filmInfo.totalRating`, `Top rated`);
    renderTopFilms(`comments`, `Most commented`);

    footerElement.querySelector(`p`).textContent = `${films.length} movies inside`;
  }
}
