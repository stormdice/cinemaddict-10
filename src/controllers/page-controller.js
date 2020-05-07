import MovieController from './movie-controller';
import SortComponent from '../components/sort';
import FilmsListComponent from '../components/film-list';
import FilmsListContainerComponent from '../components/film-list-container';
import NoFilmsComponent from '../components/no-films';
import ShowMoreButtonComponent from '../components/show-more-button';
import {SortType} from '../const';
import {RenderPosition, render, remove} from '../utils/render';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilms = (filmListElement, films, onDataChange, onCommentsDataChange, onViewChange, api) => {
  return films.map((film) => {
    const movieController = new MovieController(filmListElement, onDataChange, onCommentsDataChange, onViewChange, api);
    movieController.render(film);

    return movieController;
  });
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
    case SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
      break;
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.totalRating - a.totalRating);
      break;
  }

  return sortedFilms.slice(from, to);
};

export default class PageController {
  constructor(container, moviesModel, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._api = api;

    this._showedFilmControllers = [];
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    this._sortComponent = new SortComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmListComponent = new FilmsListComponent();
    this._filmListContainerComponent = new FilmsListContainerComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._topRatedFilmList = new FilmsListComponent(`Top rated`);
    this._mostCommentedFilmList = new FilmsListComponent(`Most commented`);

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onCommentsDataChange = this._onCommentsDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._container.hide();
    this._sortComponent.hide();
  }

  show() {
    this._container.show();
    this._sortComponent.show();
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
    render(this._filmListComponent.getElement(), this._filmListContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilms(films.slice(0, this._showingFilmsCount));

    this._renderShowMoreButton();

    this._renderExtraFilms();
  }

  _renderFilms(films) {
    const filmListContainerElement = this._filmListContainerComponent.getElement();
    const newFilms = renderFilms(filmListContainerElement, films, this._onDataChange, this._onCommentsDataChange, this._onViewChange, this._api);

    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._showingFilmsCount = this._showedFilmControllers.length;
  }

  _removeFilms() {
    const filmListContainerElement = this._filmListContainerComponent.getElement();

    filmListContainerElement.innerHTML = ``;

    this._showedFilmControllers = [];
  }

  _updateFilms(films) {
    this._removeFilms();
    this._renderFilms(films);
  }

  _onDataChange(movieController, film, newData) {
    this._api.updateMovie(film.id, newData)
      .then((movieModel) => {
        const isSuccess = this._moviesModel.updateFilm(film.id, movieModel);

        if (isSuccess) {
          movieController.render(movieModel);

          this._updateFilms(this._moviesModel.films.slice(0, this._showingFilmsCount));

          this._renderExtraFilms();

          movieController._commentsController.loadComments(film.id);
        }
      })
      .catch(() => {
        movieController.blockUserRating(false);
        movieController.shake();
      });
  }

  _onCommentsDataChange(movieController, film) {
    this._api.updateMovie(film.id, film)
      .then((movieModel) => {
        const isSuccess = this._moviesModel.updateFilm(film.id, movieModel);

        if (isSuccess) {
          movieController.updateFilmCard(movieModel);
          movieController._commentsController.loadComments(film.id);

          this._updateFilms(this._moviesModel.films.slice(0, this._showingFilmsCount));

          this._renderExtraFilms();
        }
      });
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((movieController) => {
      movieController.setDefaultView();
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

    const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), prevFilmsCount, this._showingFilmsCount);

    this._renderFilms(sortedFilms);

    if (this._showingFilmsCount >= this._moviesModel.films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onSortTypeChange(sortType) {
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    const sortedFilms = getSortedFilms(this._moviesModel.films, sortType, 0, this._showingFilmsCount);
    this._updateFilms(sortedFilms);

    this._renderShowMoreButton();
  }

  _onFilterChange() {
    this._updateFilms(this._moviesModel.films.slice(0, SHOWING_FILMS_COUNT_ON_START));
    this._renderShowMoreButton();
  }

  _renderTopFilms(films, filmsList) {
    remove(filmsList);

    if (films.length) {
      const filmListContainerComponent = new FilmsListContainerComponent();
      const container = this._container.getElement();

      render(container, filmsList, RenderPosition.BEFOREEND);
      render(filmsList.getElement(), filmListContainerComponent, RenderPosition.BEFOREEND);
      const newFilms = renderFilms(filmListContainerComponent.getElement(), films, this._onDataChange, this._onCommentsDataChange, this._onViewChange, this._api);
      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    }
  }

  _renderExtraFilms() {
    this._renderTopFilms(this._moviesModel.topRatedFilms, this._topRatedFilmList);
    this._renderTopFilms(this._moviesModel.mostCommentedFilms, this._mostCommentedFilmList);
  }
}
