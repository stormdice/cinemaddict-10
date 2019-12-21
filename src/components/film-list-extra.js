import FilmCardComponent from './film-card';
import {createElement} from "../utils";

/**
 * создаёт и возвращает разметку для блоков «Top rated movies» и «Most commented»
 * @param {Object} listExtra - данные из объекта дополнительных блоков
 * @return {String}
 */
const getFilmListExtraTemplate = (listExtra) => {
  const {title, sort} = listExtra;
  const films = sort.map((list) => new FilmCardComponent(list).getTemplate()).join(`\n`);

  return (/* html */
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container">${films}</div>
    </section>`
  );
};

export default class FilmListExtra {
  constructor(listsExtra) {
    this._listsExtra = listsExtra;
    this._element = null;
  }

  getTemplate() {
    return getFilmListExtraTemplate(this._listsExtra);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
