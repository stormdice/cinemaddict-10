/**
 * Класс, представляющий модель фильмов
 */
export default class Movies {
  /**
   * Создаёт модель для управления списком фильмов
   */
  constructor() {
    this._films = [];
  }

  get films() {
    return this._films;
  }

  set films(films) {
    this._films = Array.from(films);
  }

  /**
   * Обновляет фильм
   * @param {string} id - идентификатор фильма
   * @param {Object} film - данные из объекта фильма
   * @return {Boolean}
   */
  updateFilm(id, film) {
    const index = this._films.findIndex((movie) => movie.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    return true;
  }
}
