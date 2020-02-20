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

export {formatDuration, formatDate};
