const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

const formatDate = (date) => {
  return `${date.getDay()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
};

/**
 * Конвертирует продолжительность фильма в формат «1h 36m»
 * @param {number} duration - продолжительность фильма
 * @return {string}
 */
const formatDuration = (duration) => {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;

  return `${hours}h ${minutes}m`;
};

/**
 * Возвращает 2 топовых фильма по заданному свойству
 * @param {Array} films - массив фильмов
 * @param {string} props - свойство из объекта фильма
 * @return {Array}
 */
const getTopFilms = (films, props) => {
  return films
    .sort((a, b) => b[props] - a[props])
    .slice(0, 2)
    .filter((film) => film[props]);
};

/**
 * Возвращает DOM элемент
 * @param {string} template
 * @return {DOMNode}
 */
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

/**
 * Вставляет DOM элемент в указанное место
 * @param {HTMLElement} container - элемент относительно которого идёт вставка
 * @param {HTMLElement} element - DOM элемент
 * @param {string} place - позиция для вставки
 */
const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    default:
      throw new Error(`Вы должны указать позицию для вставки из объекта RenderPosition - либо в начало: AFTERBEGIN, либо в конец: BEFOREEND`);
  }
};

export {RenderPosition, formatDuration, getTopFilms, formatDate, createElement, render};


