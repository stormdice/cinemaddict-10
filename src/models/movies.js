export default class Movies {
  constructor() {
    this._films = [];
  }

  get films() {
    return this._films;
  }

  set films(films) {
    this._films = Array.from(films);
  }

  updateFilms(id, film) {
    const index = this._films.findIndex((movie) => movie.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    return true;
  }
}
