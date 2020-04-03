export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getMovies() {
    return this._api.getMovies();
  }

  updateMovie(id, movie) {
    return this._api.updateMovie(id, movie);
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
}
