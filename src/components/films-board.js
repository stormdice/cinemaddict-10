import AbstractComponent from "./abstract-component";

/**
 * создаёт и возвращает разметку для раздела с фильмами
 * @return {String}
 */
const getFilmsBoardTemplate = () => (/* html */
  `<section class="films"></section>`
);

export default class FilmBoard extends AbstractComponent {
  getTemplate() {
    return getFilmsBoardTemplate();
  }
}
