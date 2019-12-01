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

export {render, renderDataFromArrayOfObjects};
