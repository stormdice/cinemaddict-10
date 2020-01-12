import moment from 'moment';

export const formatFilmCardYear = (date) => {
  return moment(date).format(`YYYY`);
};

export const formatFilmDetailsReleaseDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const formatComments = (date) => {
  const startDate = moment(date);
  const now = moment();

  return startDate.from(now);
};
