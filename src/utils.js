export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

/**
 * Возращает разметку из массива объектов
 * @param {Array} array - данные из массива
 * @param {String} template - шаблон разметки
 * @return {String}
 */
export const renderDataFromArrayOfObjects = (array, template) =>
  array.map(template).join(``);

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
