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

const getFilterName = (name) => {
  if (name === `all`) {
    return `All movies`;
  }

  return name[0].toUpperCase().concat(name.slice(1));
};

export {formatDuration, formatDate, getFilterName};
