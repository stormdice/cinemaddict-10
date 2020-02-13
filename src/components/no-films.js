import AbstractComponent from './abstract-component.js';

/**
 * Создаёт и возвращает разметку раздела без фильмов
 * @return {string}
 */
const createNoFilmsTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>`
  );
};

/**
 * Класс, представляющий отсутствие фильмов
 * @extends AbstractComponent
 */
export default class NoFilms extends AbstractComponent {
  /**
   * Возвращает функцию создания разметки
   * @return {Function}
   */
  getTemplate() {
    return createNoFilmsTemplate();
  }
}
