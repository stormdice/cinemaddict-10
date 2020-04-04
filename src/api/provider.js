import Movie from '../models/movie';

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getMovies() {
    if (this._isOnLine()) {
      return this._api.getMovies();
    }

    return Promise.resolve(Movie.parseMovies([]));
  }

  updateMovie(id, movie) {
    if (this._isOnLine()) {
      return this._api.updateMovie(id, movie);
    }

    return Promise.resolve(movie);
  }

  getComments(movieId) {
    return this._api.getComments(movieId);
  }

  createComment(movieId, comment) {
    return this._api.createComment(movieId, comment);
  }

  deleteComment(id) {
    return this._api.deleteComment(id);
  }

  _isOnLine() {
    return window.navigator.onLine;
  }
}
