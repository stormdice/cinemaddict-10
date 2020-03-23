import API from '../api';
import FilmComponent from '../components/film';
import FilmDetailsComponent from '../components/film-details';
import MovieModel from '../models/movie';
import CommentsController from './comments-controller';
import {RenderPosition, render, replace} from '../utils/render';

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = new API();

    this._mode = Mode.DEFAULT;

    this._filmComponent = null;
    this._filmDetailsComponent = null;
    this._commentsContainer = null;
    this._commentsController = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmComponent = new FilmComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);
    this._commentsContainer = this._filmDetailsComponent.getElement().querySelector(`.film-details__comments-wrap`);
    this._commentsController = new CommentsController(this._commentsContainer, film);

    this._filmComponent.setOpenDetailsClickHandler((evt) => {
      evt.preventDefault();
      this._openFilmDetails(film);
    });

    this._filmComponent.setWatchlistClickHandler(() => {
      this._addToWatchlist(film);
    });

    this._filmComponent.setWatchedClickHandler(() => {
      this._addToHistory(film);
    });

    this._filmComponent.setFavoriteClickHandler(() => {
      this._addToFavorite(film);
    });

    this._filmDetailsComponent.setCloseButtonClickHandler(() => {
      this._closeFilmDetails();
    });

    this._filmDetailsComponent.setWatchlistInputChangeHandler(() => {
      this._addToWatchlist(film);
    });

    this._filmDetailsComponent.setWatchedInputChangeHandler(() => {
      this._addToHistory(film);
    });

    this._filmDetailsComponent.setFavoriteInputChangeHandler(() => {
      this._addToFavorite(film);
    });

    if (oldFilmComponent && oldFilmDetailsComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container.querySelector(`.films-list__container`), this._filmComponent, RenderPosition.BEFOREEND);
    }

    this._commentsController.renderCommentsForm();
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeFilmDetails();
    }
  }

  _addToWatchlist(film) {
    const updatedFilm = MovieModel.clone(film);
    updatedFilm.isWatchlist = !updatedFilm.isWatchlist;

    this._onDataChange(this, film, updatedFilm);
  }

  _addToHistory(film) {
    const updatedFilm = MovieModel.clone(film);
    updatedFilm.isWatched = !updatedFilm.isWatched;

    this._onDataChange(this, film, updatedFilm);
  }

  _addToFavorite(film) {
    const updatedFilm = MovieModel.clone(film);
    updatedFilm.isFavorite = !updatedFilm.isFavorite;

    this._onDataChange(this, film, updatedFilm);
  }

  _openFilmDetails(film) {
    this._onViewChange();

    this._filmDetailsComponent.getElement().style = `animation: bounceInRight 0.3s;`;

    render(document.body, this._filmDetailsComponent, RenderPosition.BEFOREEND);

    document.addEventListener(`keydown`, this._onEscKeyDown);

    this._mode = Mode.DETAILS;

    this._loadComments(film.id);
  }

  _loadComments(movieId) {
    this._api.getComments(movieId)
      .then((comments) => {
        this._commentsController.render(comments);
      });
  }

  _closeFilmDetails() {
    this._filmDetailsComponent.getElement().remove();
    document.removeEventListener(`keydown`, this._onEscKeyDown);

    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closeFilmDetails();
    }
  }
}
