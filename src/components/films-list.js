import AbstractComponent from "./abstract-component";

/**
 * Создаёт и возвращает разметку для раздела с фильмами
 * @param {Object} filmList - данные из объекта списков с фильмами
 * @return {String}
 */
const getFilmsListTemplate = (filmList) => {
  const {title, extra, sort} = filmList;

  return (/* html */
    `<section class="${extra ? `films-list--extra` : `films-list`}">
      <h2 class="films-list__title ${extra ? `visually-hidden` : ``}">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmList extends AbstractComponent {
  constructor(filmLists) {
    super();

    this._filmLists = filmLists;
  }

  getTemplate() {
    return getFilmsListTemplate(this._filmLists);
  }
}
