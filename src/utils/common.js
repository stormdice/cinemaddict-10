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

const formatDuration = (duration) => {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;

  return `${hours}h ${minutes}m`;
};

const getFilterTitle = (title) => {
  if (title === `all`) {
    return `All movies`;
  }

  return title[0].toUpperCase().concat(title.slice(1));
};

export {formatDuration, formatDate, getFilterTitle};
