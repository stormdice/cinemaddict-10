export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

/**
 * Возращает случайный индекс массива
 * @param {Array} array - данные из массива
 * @return {Number}
 */
export const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};

/**
 * Возращает случайное булево значение
 * @return {Boolean}
 */
export const getRandomBoolean = () => {
  return Math.random() >= 0.5;
};

/**
 * Возращает случайный элемент из массива
 * @param {Array} array - данные из массива
 * @return {String}
 */
export const getRandomElementFromArray = (array) => {
  const randomIdx = getRandomIndex(array);
  const randomElement = array.find((title, idx) => idx === randomIdx);

  return randomElement;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
