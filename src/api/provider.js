import Movie from '../models/movie';

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
    this._isSynchronized = true;
  }

  getMovies() {
    if (this._isOnLine()) {
      return this._api.getMovies().then(
          (movies) => {
            movies.forEach((movie) => this._store.setItem(movie.id, movie.toRAW()));

            return movies;
          }
      );
    }

    const storeMovies = Object.values(this._store.getAll());

    this._isSynchronized = false;

    return Promise.resolve(Movie.parseMovies(storeMovies));
  }

  updateMovie(id, movie) {
    if (this._isOnLine()) {
      return this._api.updateMovie(id, movie).then(
          (newMovie) => {
            this._store.setItem(newMovie.id, newMovie.toRAW());
            return newMovie;
          }
      );
    }

    const fakeUpdatedMovie = Movie.parseMovie(Object.assign({}, movie.toRAW(), {id}));

    this._isSynchronized = false;

    this._store.setItem(id, Object.assign({}, fakeUpdatedMovie.toRAW(), {offline: true}));

    return Promise.resolve(fakeUpdatedMovie);
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
