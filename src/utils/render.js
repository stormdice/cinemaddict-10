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

export {RenderPosition, createElement, render, remove};
