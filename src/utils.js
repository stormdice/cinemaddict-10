/**
 * Вставляет разметку
 * @param {DOMNode} container - элемент, относительно которого будет вставка
 * @param {String} template - шаблон разметки
 * @param {DOMString} place - определяет позицию добавляемого элемента относительно элемента, вызвавшего метод
 */
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

/**
 * Возращает разметку из массива объектов
 * @param {Array} array - данные из массива
 * @param {String} template - шаблон разметки
 * @return {String}
 */
const renderDataFromArrayOfObjects = (array, template) => array.map(template).join(``);

/**
 * Возращает случайный индекс массива
 * @param {Array} array - данные из массива
 * @return {Number}
 */
const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};

/**
 * Возращает случайное булево значение
 * @return {Boolean}
 */
const getRandomBoolean = () => {
  return Math.random() >= 0.5;
};

/**
 * Возращает случайный элемент из массива
 * @param {Array} array - данные из массива
 * @return {String}
 */
const getRandomElementFromArray = (array) => {
  const randomIdx = getRandomIndex(array);
  const randomElement = array.find((title, idx) => idx === randomIdx);

  return randomElement;
};

export {render, renderDataFromArrayOfObjects, getRandomIndex, getRandomElementFromArray, getRandomBoolean};
