import {FilterType} from '../const';

const getAllFilms = (films) => {
  return films;
};

const getWatchlistFIlms = (films) => {
  return films.filter((film) => film.isWatchlist);
};

const getHistoryFilms = (films) => {
  return films.filter((film) => film.isWatched);
};

const getFavoritesFilms = (films) => {
  return films.filter((film) => film.isFavorite);
};

const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return getAllFilms(films);
    case FilterType.WATCHLIST:
      return getWatchlistFIlms(films);
    case FilterType.HISTORY:
      return getHistoryFilms(films);
    case FilterType.FAVORITES:
      return getFavoritesFilms(films);
  }

  return films;
};

export {getAllFilms, getWatchlistFIlms, getHistoryFilms, getFavoritesFilms, getFilmsByFilter};
