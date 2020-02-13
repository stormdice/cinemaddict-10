import {createElement} from '../utils/render.js';

/**
 * Класс, представляющий набор общих методов для других компонентов
 */
export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  /**
   * Запрещает использовать этот метод здесь, так так он не реализован у абстрактного компонента
   */
  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  /**
   * Возвращает DOM элемент данного компонента
   * @return {HTMLElement}
   */
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  /**
   * Удаляет DOM элемент у данного компонента
   */
  removeElement() {
    this._element = null;
  }
}
