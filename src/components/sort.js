import AbstractComponent from './abstract-component.js';

const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

/**
 * Создаёт и возвращает разметку сортировки
 * @return {string}
 */
const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
    </ul>`
  );
};

/**
 * Класс, представляющий сортировку
 * @extends AbstractComponent
 */
export default class Sort extends AbstractComponent {
  /**
   * Возвращает функцию создания разметки
   * @return {Function}
   */
  getTemplate() {
    return createSortTemplate();
  }
}

export {SortType};
