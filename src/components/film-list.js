import AbstractComponent from './abstract-component';

const createFilmsListTemplate = (title = false) => {
  const listTitle = `<h2 class="films-list__title ${title ? `` : `visually-hidden`}">${title ? title : `All movies. Upcoming`}</h2>`;

  return (
    `<section class="${title ? `films-list--extra` : `films-list`}">
      ${listTitle}
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmsList extends AbstractComponent {
  constructor(title) {
    super();

    this._title = title;
  }

  getTemplate() {
    return createFilmsListTemplate(this._title);
  }
}
