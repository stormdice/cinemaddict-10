import {getFilmsByFilter} from '../utils/filter.js';
import {FilterType} from '../const.js';

export default class Movies {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterType.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  get films() {
    return getFilmsByFilter(this._films, this._activeFilterType);
  }

  get allFilms() {
    return this._films;
  }

  get topRatedFilms() {
    return this._films.slice().sort((a, b) => b.totalRating - a.totalRating)
      .slice(0, 2)
      .filter((film) => film.totalRating);
  }

  get mostCommentedFilms() {
    return this._films.slice().sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, 2)
      .filter((film) => film.comments.length);
  }

  set films(films) {
    this._films = Array.from(films);
  }

  set filter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((movie) => movie.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addComment(movieId, comment) {
    const movie = this._films.find((it) => it.id === movieId);

    movie.comments = [].concat(comment, movie.comments);
    this._callHandlers(this._dataChangeHandlers);
  }

  removeComment(movieId, commentId) {
    const movie = this._films.find((it) => it.id === movieId);
    const commentIndex = movie.comments.findIndex((it) => it.id === commentId);

    if (commentIndex === -1) {
      return false;
    }

    movie.comments = [].concat(movie.comments.slice(0, commentIndex), movie.comments.slice(commentIndex + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
