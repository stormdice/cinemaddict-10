import AbstractComponent from './abstract-component';

const getFilmListExtraTemplate = (title) => {
  return (/* html */
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmListExtra extends AbstractComponent {
  constructor(title) {
    super();

    this._title = title;
    this._element = null;
  }

  getTemplate() {
    return getFilmListExtraTemplate(this._title);
  }
}
