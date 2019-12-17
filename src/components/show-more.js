import {createElement} from '../utils.js';

/**
 * создаёт и возвращает разметку кнопки 'Показать больше'
 * @return {String}
 */
const getButtonShowMoreTemplate = () => (/* html */
  `<button class="films-list__show-more">Show more</button>`
);

export default class ShowMoreButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getButtonShowMoreTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
