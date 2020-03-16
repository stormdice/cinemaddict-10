export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.title = data[`film_info`][`title`];
    this.originalTitle = data[`film_info`][`alternative_title`];
    this.totalRating = data[`film_info`][`total_rating`];
    this.country = data[`film_info`][`release`][`release_country`];
    this.poster = data[`film_info`][`poster`];
    this.ageRating = data[`film_info`][`age_rating`];
    this.director = data[`film_info`][`director`];
    this.writers = data[`film_info`][`writers`];
    this.actors = data[`film_info`][`actors`];
    this.releaseDate = data[`film_info`][`release`][`date`];
    this.runtime = data[`film_info`][`runtime`];
    this.genres = data[`film_info`][`genre`];
    this.description = data[`film_info`][`description`];
    this.personalRating = data[`user_details`][`personal_rating`];
    this.isWatchlist = data[`user_details`][`watchlist`];
    this.isWatched = data[`user_details`][`already_watched`];
    this.isFavorite = data[`user_details`][`favorite`];
    this.comments = data[`comments`];
    this.watchingDate = data[`user_details`][`watching_date`];
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }
}
