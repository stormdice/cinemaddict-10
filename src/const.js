const EMOTIONS = [`smile`, `sleeping`, `puke`, `angry`];

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

export {userRanks, EMOTIONS, SortType, FilterType};
