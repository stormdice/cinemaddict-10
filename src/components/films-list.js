import AbstractComponent from "./abstract-component";

const getTitle = (isHaveFilms) => {
  const noFilmsText = `There are no movies in our database`;
  const filmsText = `All movies. Upcoming`;

  return `<h2 class="films-list__title ${isHaveFilms ? `visually-hidden` : ``}">${isHaveFilms ? filmsText : noFilmsText}</h2>`;
};

const getFilmsListTemplate = (isHaveFilms) => {
  return (/* html */
    `<section class="films-list">
      ${getTitle(isHaveFilms)}
    </section>`
  );
};

export default class FilmList extends AbstractComponent {
  constructor(isHaveFilms) {
    super();
    this._isHaveFilms = isHaveFilms;
  }

  getTemplate() {
    return getFilmsListTemplate(this._isHaveFilms);
  }
}
