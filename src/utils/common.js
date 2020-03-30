import moment from 'moment';

const SECONDS_IN_A_MINUTE = 60;

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const filmCardFormatReleaseDate = (date) => {
  return moment.utc(date).format(`YYYY`);
};

const filmDetailsFormatReleaseDate = (date) => {
  return moment.utc(date).format(`DD MMMM YYYY`);
};

const formatRuntime = (runtime) => {
  const hours = Math.trunc(runtime / SECONDS_IN_A_MINUTE);
  const minutes = runtime % SECONDS_IN_A_MINUTE;

  return `${hours}h ${minutes}m`;
};

const commentFormatDate = (date) => {
  return moment.utc().to(date);
};

const getFilterTitle = (title) => {
  if (title === `all`) {
    return `All movies`;
  }

  return title[0].toUpperCase().concat(title.slice(1));
};

export {
  SECONDS_IN_A_MINUTE,
  getRandomIntegerNumber,
  getRandomArrayItem,
  getRandomDate,
  formatRuntime,
  filmCardFormatReleaseDate,
  filmDetailsFormatReleaseDate,
  commentFormatDate,
  getFilterTitle
};
