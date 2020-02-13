import AbstractComponent from './abstract-component.js';

/**
 * Создаёт и возвращает разметку кнопки 'Смотреть больше'
 * @return {string}
 */
const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

/**
 * Класс, представляющий кнопку загрузить больше
 * @extends AbstractComponent
 */
export default class ShowMoreButton extends AbstractComponent {
  /**
   * Возвращает функцию создания разметки
   * @return {Function}
   */
  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  /**
   * Устанавливает слушатель событий
   * @param {Function} handler - функция для слушателя
   */
  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
