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

const renderFilms = (filmsContainer, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(filmsContainer, onDataChange, onViewChange);
    movieController.render(film);

    return movieController;
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._films = [];
    this._showedFilmControllers = [];
    this._sortComponent = new SortComponent();
    this._filmsBoard = new FilmsBoardComponent();
    this._filmsContainer = new FilmsContainerComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._topRatedFilmsComponent = new FilmListExtraComponent(`Top rated`);
    this._mostCommentedFilmsComponent = new FilmListExtraComponent(`Most commented`);
    this._showingFilmsCount = SHOWING_FILMS_ON_START;
    this._EXTRA_FILMS_LIMIT = 2;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(films) {
    this._films = films;
    this._filmsListComponent = new FilmsListComponent(films.length);

    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._filmsBoard, RenderPosition.BEFOREEND);

    render(this._filmsBoard.getElement(), this._filmsListComponent, RenderPosition.BEFOREEND);

    if (!this._films.length) {
      return;
    }

    render(this._filmsListComponent.getElement(), this._filmsContainer, RenderPosition.BEFOREEND);

    const newFilms = renderFilms(this._filmsContainer.getElement(), films.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._renderShowMoreButton();

    const topRatedFilms = this._films
      .slice()
      .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
      .filter((film) => film.filmInfo.totalRating > 0)
      .slice(0, this._EXTRA_FILMS_LIMIT);

    if (topRatedFilms.length > 0) {
      render(this._filmsBoard.getElement(), this._topRatedFilmsComponent, RenderPosition.BEFOREEND);
      const topFilmsContainer = this._topRatedFilmsComponent.getElement().querySelector(`.films-list__container`);
      renderFilms(topFilmsContainer, topRatedFilms);
    }

    const mostCommentedFilms = this._films
      .slice()
      .sort((a, b) => b.comments - a.comments)
      .filter((film) => film.comments > 0)
      .slice(0, this._EXTRA_FILMS_LIMIT);

    if (mostCommentedFilms.length > 0) {
      render(this._filmsBoard.getElement(), this._mostCommentedFilmsComponent, RenderPosition.BEFOREEND);
      const topFilmsContainer = this._mostCommentedFilmsComponent.getElement().querySelector(`.films-list__container`);
      renderFilms(topFilmsContainer, mostCommentedFilms);
    }

    footerElement.querySelector(`p`).textContent = `${films.length} movies inside`;
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    movieController.render(this._films[index]);
  }

  _onViewChange() {
    // this._showedFilmControllers.forEach((filmDetails) => filmDetails.setDefaultView());
    console.log(`da nichego ne delaetsa`);
  }

  _renderShowMoreButton() {
    if (this._showingFilmsCount >= this._films.length) {
      return;
    }

    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_BY_BUTTON;

      const newFilms = renderFilms(this._filmsContainer.getElement(), this._films.slice(prevFilmsCount, this._showingFilmsCount), this._onDataChange, this._onViewChange);
      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

      if (this._showingFilmsCount >= this._films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    let sortedFilms = [];

    switch (sortType) {
      case SortType.DEFAULT:
        sortedFilms = this._films.slice(0, this._showingFilmsCount);
        break;
      case SortType.DATE:
        sortedFilms = this._films.slice().sort((a, b) => b.release.date - a.release.date);
        break;
      case SortType.RATING:
        sortedFilms = this._films.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
        break;
    }

    this._filmsContainer.getElement().innerHTML = ``;

    const newFilms = renderFilms(this._filmsContainer.getElement(), sortedFilms, this._onDataChange, this._onViewChange);
    this._showedTaskControllers = newFilms;

    if (sortType === SortType.DEFAULT) {
      this._renderShowMoreButton();
    } else {
      remove(this._showMoreButtonComponent);
    }
  }
}
