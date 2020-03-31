import moment from 'moment';

const SECONDS_IN_A_MINUTE = 60;

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

export {
  SECONDS_IN_A_MINUTE,
  formatRuntime,
  filmCardFormatReleaseDate,
  filmDetailsFormatReleaseDate,
  commentFormatDate
};
