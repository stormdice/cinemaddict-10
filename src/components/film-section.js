import AbstractComponent from './abstract-component.js';

/**
 * Создаёт и возвращает разметку раздела для фильмов
 * @return {string}
 */
const createFilmsSectionTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

/**
 * Класс, представляющий общий раздел для фильмов
 * @extends AbstractComponent
 */
export default class FilmsSection extends AbstractComponent {
  /**
   * Возвращает функцию создания разметки
   * @return {Function}
   */
  getTemplate() {
    return createFilmsSectionTemplate();
  }
}
