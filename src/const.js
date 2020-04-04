const EMOTIONS = [`smile`, `sleeping`, `puke`, `angry`];

const DEBOUNCE_TIMEOUT = 150;

const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

const userRanks = {
  novice: {
    min: 1,
    max: 10
  },
  fan: {
    min: 11,
    max: 20
  },
  movieBuff: {
    min: 21
  }
};

const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

const StatisticsType = {
  ALL: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export {EMOTIONS, DEBOUNCE_TIMEOUT, SortType, userRanks, FilterType, StatisticsType};
