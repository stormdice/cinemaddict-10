export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

/**
 * Возращает dom элемент
 * @param {string} template - разметка в виде строки
 * @return {DomNode}
 */
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

/**
 * Отображает элементы в разметке
 * @param {DOMNode} container - контейнер, в который будет вставляться компонент
 * @param {DOMNode} component - элемент, который будет вставляться
 * @param {string} place - позиция для вставки
 */
export const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
    default:
      throw new Error(`Указана неверная позиция для вставки элемента, используйте RenderPosition.BEFOREEND или RenderPosition.AFTERBEGIN`);
  }
};

/**
 * Удаляет компонент из разметки и ссылку на него
 * @param {Object} component - компонент класса
 */
export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

/**
 * Заменяет DOM элемент
 * @param {DOMNode} newComponent - новый элемент
 * @param {DOMNode} oldComponent - элемент, котрый нужно заменить
 */
export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && oldElement && newElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};
