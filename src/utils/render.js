const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

/**
 * Возвращает DOM элемент
 * @param {string} template - разметка в виде строки
 * @return {HTMLElement}
 */
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

/**
 * Вставляет DOM элемент в указанное место
 * @param {HTMLElement} container - элемент относительно которого идёт вставка
 * @param {Object} component - компонент
 * @param {string} place - позиция для вставки
 */
const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
    default:
      throw new Error(`Вы должны указать позицию для вставки из объекта RenderPosition - либо в начало: AFTERBEGIN, либо в конец: BEFOREEND`);
  }
};

/**
 * Удаляет компонент
 * @param {Object} component - компонент
 */
const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

/**
 * Заменяет компоненты
 * @param {Object} newComponent - новый компонент
 * @param {Object} oldComponent - старый компонент
 */
const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export {RenderPosition, createElement, render, remove, replace};
