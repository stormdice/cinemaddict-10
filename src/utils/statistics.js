import {StatisticsType} from '../const';
import moment from 'moment';

const getAllTimeFilms = (films) => {
  return films;
};

const getTodayWatchedFilms = (films) => {
  return films
    .filter((film) => moment(film.watchingDate).isBetween(moment().startOf(`day`), moment().endOf(`day`)));
};

const getWeekWatchedFilms = (films) => {
  return films
    .filter((film) => moment(film.watchingDate).isBetween(moment().startOf(`isoWeek`), moment().endOf(`isoWeek`)));
};

const getMonthWatchedFilms = (films) => {
  return films
    .filter((film) => moment(film.watchingDate).isBetween(moment().startOf(`month`), moment().endOf(`month`)));
};

const getYearWatchedFilms = (films) => {
  return films
    .filter((film) => moment(film.watchingDate).isBetween(moment().startOf(`year`), moment().endOf(`year`)));
};

const getFilmsByStatistics = (films, filterType) => {
  switch (filterType) {
    case StatisticsType.ALL:
      return getAllTimeFilms(films);
    case StatisticsType.TODAY:
      return getTodayWatchedFilms(films);
    case StatisticsType.WEEK:
      return getWeekWatchedFilms(films);
    case StatisticsType.MONTH:
      return getMonthWatchedFilms(films);
    case StatisticsType.YEAR:
      return getYearWatchedFilms(films);
  }

  return films;
};

export {getFilmsByStatistics};
