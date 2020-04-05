import Movie from '../models/movie';

const getSyncedMovies = (items) => items
  .filter(({success}) => success)
  .map(({payload}) => payload.movie);

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

  getSynchronize() {
    return this._isSynchronized;
  }

  sync() {
    if (this._isOnLine()) {
      const storeMovies = Object.values(this._store.getAll());

      return this._api.sync(storeMovies)
        .then((response) => {
          storeMovies.filter((movie) => movie.offline)
            .forEach((movie) => {
              this._store.removeItem(movie.id);
            });

          const updatedMovies = getSyncedMovies(response.updated);

          [...updatedMovies].forEach((movie) => {
            this._store.setItem(movie.id, movie);
          });

          this._isSynchronized = true;

          return Promise.resolve();
        });
    }

    return Promise.reject(new Error(`Sync movies failed`));
  }

  _isOnLine() {
    return window.navigator.onLine;
  }
}
