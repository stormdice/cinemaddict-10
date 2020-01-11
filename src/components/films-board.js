import AbstractComponent from "./abstract-component";

const getFilmsBoardTemplate = () => (/* html */
  `<section class="films"></section>`
);

export default class FilmBoard extends AbstractComponent {
  getTemplate() {
    return getFilmsBoardTemplate();
  }
}
