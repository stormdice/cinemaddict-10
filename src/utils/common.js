import moment from 'moment';

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
  return moment(date).format(`YYYY`);
};

const filmDetailsFormatReleaseDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

const filmDetailsFormatRuntime = (runtime) => {
  const hours = Math.trunc(runtime / 60);
  const minutes = runtime % 60;

  return `${hours}h ${minutes}m`;
};

const commentFormatDate = (date) => {
  // return moment(date).format(`YYYY/MM/DD HH:MM`);
  return moment().to(date);
};

const getFilterTitle = (title) => {
  if (title === `all`) {
    return `All movies`;
  }

  return title[0].toUpperCase().concat(title.slice(1));
};

export {
  getRandomIntegerNumber,
  getRandomArrayItem,
  getRandomDate,
  filmDetailsFormatRuntime,
  filmCardFormatReleaseDate,
  filmDetailsFormatReleaseDate,
  commentFormatDate,
  getFilterTitle
};
