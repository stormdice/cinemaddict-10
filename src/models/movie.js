export default class Movie {
  constructor(movie) {
    this.id = movie.id;
    this.comments = movie.comments;
    this.title = movie.film_info.title;
    this.originalTitle = movie.film_info.alternative_title;
    this.totalRating = movie.film_info.total_rating;
    this.poster = movie.film_info.poster;
    this.ageRating = movie.film_info.age_rating;
    this.director = movie.film_info.director;
    this.writers = movie.film_info.writers;
    this.actors = movie.film_info.actors;
    this.releaseDate = movie.film_info.release.date;
    this.country = movie.film_info.release.release_country;
    this.runtime = movie.film_info.runtime;
    this.genres = movie.film_info.genre;
    this.description = movie.film_info.description;
    this.personalRating = movie.user_details.personal_rating;
    this.isWatchlist = movie.user_details.watchlist;
    this.isWatched = movie.user_details.already_watched;
    this.isFavorite = movie.user_details.favorite;
    this.watchingDate = movie.user_details.watching_date;
  }

  toRAW() {
    return {
      'id': this.id,
      'comments': this.comments,
      'film_info': {
        'title': this.title,
        'alternative_title': this.originalTitle,
        'total_rating': this.totalRating,
        'poster': this.poster,
        'age_rating': this.ageRating,
        'director': this.director,
        'writers': this.writers,
        'actors': this.actors,
        'release': {
          'date': this.releaseDate,
          'release_country': this.country
        },
        'runtime': this.runtime,
        'genre': this.genres,
        'description': this.description,
      },
      'user_details': {
        'personal_rating': this.personalRating,
        'watchlist': this.isWatchlist,
        'already_watched': this.isWatched,
        'watching_date': new Date().toISOString(),
        'favorite': this.isFavorite
      }
    };
  }

  static parseMovie(movie) {
    return new Movie(movie);
  }

  static parseMovies(movies) {
    return movies.map(Movie.parseMovie);
  }

  static clone(movie) {
    return new Movie(movie.toRAW());
  }
}
