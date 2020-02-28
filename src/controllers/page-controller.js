import SortComponent from '../components/sort.js';
import {SortType} from '../const.js';
import MovieController from './movie-controller.js';
import FilmsListComponent from '../components/film-list.js';
import NoFilmsComponent from '../components/no-films.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import {RenderPosition, render, remove} from '../utils/render.js';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilms = (filmListElement, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(filmListElement, onDataChange, onViewChange);
    movieController.render(film);

    return movieController;
  });
};

export default class PageController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._showedFilmControllers = [];
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    this._sortComponent = new SortComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmListComponent = new FilmsListComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._topRatedFilmList = new FilmsListComponent(`Top rated`);
    this._mostCommentedFilmList = new FilmsListComponent(`Most commented`);

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const container = this._container.getElement();
    const films = this._moviesModel.films;

    container.insertAdjacentElement(`beforebegin`, this._sortComponent.getElement());

    if (!films.length) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._filmListComponent, RenderPosition.BEFOREEND);

    this._renderFilms(films.slice(0, this._showingFilmsCount));

    this._renderShowMoreButton();

    this._renderExtraFilms();
  }

  _renderFilms(films) {
    const filmListElement = this._filmListComponent.getElement();

    const newFilms = renderFilms(filmListElement, films, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._showingFilmsCount = this._showedFilmControllers.length;
  }

  _removeFilms() {
    const filmListContainerElement = this._filmListComponent.getElement().querySelector(`.films-list__container`);

    filmListContainerElement.innerHTML = ``;

    this._showedFilmControllers = [];
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._moviesModel.films.slice(0, count));
    this._renderShowMoreButton();
    this._renderTopFilms(this._moviesModel.topRatedFilms, this._topRatedFilmList);
    this._renderTopFilms(this._moviesModel.mostCommentedFilms, this._mostCommentedFilmList);
  }

  _onDataChange(movieController, oldData, newData, commentId = false) {
    if (newData === null) {
      this._moviesModel.removeComment(oldData.id, commentId);
      this._updateFilms(this._showingFilmsCount);
      movieController._filmDetailsComponent.rerender();
    } else {
      const isSuccess = this._moviesModel.updateFilm(oldData.id, newData);

      if (isSuccess) {
        movieController.render(newData);
      }
    }
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => {
      it.setDefaultView();
    });
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._showingFilmsCount >= this._moviesModel.films.length) {
      return;
    }

    const filmListElement = this._filmListComponent.getElement();
    render(filmListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _onShowMoreButtonClick() {
    const prevFilmsCount = this._showingFilmsCount;
    const films = this._moviesModel.films;

    this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    this._renderFilms(films.slice(prevFilmsCount, this._showingFilmsCount));

    if (this._showingFilmsCount >= this._moviesModel.films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onSortTypeChange(sortType) {
    let sortedFilms = [];
    const films = this._moviesModel.films;

    switch (sortType) {
      case SortType.DEFAULT:
        sortedFilms = films.slice(0, this._showingFilmsCount);
        break;
      case SortType.DATE:
        sortedFilms = films.slice().sort((a, b) => b.releaseDate - a.releaseDate);
        break;
      case SortType.RATING:
        sortedFilms = films.slice().sort((a, b) => b.totalRating - a.totalRating);
        break;
    }

    this._removeFilms();
    this._renderFilms(sortedFilms);

    if (sortType === SortType.DEFAULT) {
      this._renderShowMoreButton();
    } else {
      remove(this._showMoreButtonComponent);
    }
  }

  _onFilterChange() {
    this._removeFilms();
    this._renderFilms(this._moviesModel.films.slice(0, SHOWING_FILMS_COUNT_ON_START));
    this._renderShowMoreButton();
  }

  _renderTopFilms(films, filmsList) {
    remove(filmsList);

    if (films.length) {
      const container = this._container.getElement();
      render(container, filmsList, RenderPosition.BEFOREEND);
      renderFilms(filmsList.getElement(), films, this._onDataChange, this._onViewChange);
    }
  }

  _renderExtraFilms() {
    this._renderTopFilms(this._moviesModel.topRatedFilms, this._topRatedFilmList);
    this._renderTopFilms(this._moviesModel.mostCommentedFilms, this._mostCommentedFilmList);
  }
}
