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

export {formatDuration, getTopFilms, formatDate};
