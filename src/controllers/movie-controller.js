import FilmComponent from '../components/film';
import FilmDetailsComponent from '../components/film-details';
import MovieModel from '../models/movie';
import CommentsController from './comments-controller';
import {RenderPosition, render, replace} from '../utils/render';

const SHAKE_ANIMATION_TIMEOUT = 600;
const FILM_DETAIL_OPEN_ANIMATION = `animation: bounceInRight 0.3s;`;

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export default class MovieController {
  constructor(container, onDataChange, onCommentsDataChange, onViewChange, api) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onCommentsDataChange = onCommentsDataChange;
    this._onViewChange = onViewChange;
    this._api = api;

    this._mode = Mode.DEFAULT;

    this._filmComponent = null;
    this._filmDetailsComponent = null;
    this._commentsContainer = null;
    this._commentsController = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this.shake = this.shake.bind(this);
    this._onCommentsCountChange = this._onCommentsCountChange.bind(this);
  }

  render(film) {
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmComponent = new FilmComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._commentsContainer = this._filmDetailsComponent.getElement()
      .querySelector(`.film-details__comments-wrap`);

    this._commentsController = new CommentsController(this._commentsContainer, film, this._api);

    this._commentsController.shake(this.shake);
    this._commentsController.onCommentsCountChangeHandler(this._onCommentsCountChange);

    this._addFilmCardEvents(film);

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

    this._filmDetailsComponent.setUserRatingInputChangeHandler((score) => {
      const updatedFilm = MovieModel.clone(film);
      updatedFilm.personalRating = Number(score);

      this.blockUserRating(true);

      this._onDataChange(this, film, updatedFilm);
    });

    this._filmDetailsComponent.setUndoButtonClickHandler(() => {
      const updatedFilm = MovieModel.clone(film);

      this._resetUserRating(updatedFilm);

      this._onDataChange(this, film, updatedFilm);
    });

    if (oldFilmComponent && oldFilmDetailsComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container.querySelector(`.films-list__container`), this._filmComponent, RenderPosition.BEFOREEND);
    }

    this._commentsController.renderCommentsForm();
  }

  updateFilmCard(film) {
    const oldFilmComponent = this._filmComponent;

    this._filmComponent = new FilmComponent(film);

    this._addFilmCardEvents(film);

    if (oldFilmComponent) {
      replace(this._filmComponent, oldFilmComponent);
    } else {
      render(this._container.querySelector(`.films-list__container`), this._filmComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeFilmDetails();
    }
  }

  blockUserRating(shouldBlock) {
    const userRatingElement = this._filmDetailsComponent.getElement()
      .querySelector(`.film-details__user-rating-wrap`);

    if (!userRatingElement) {
      return;
    }

    const inputs = userRatingElement.querySelectorAll(`input, button`);

    inputs.forEach((input) => {
      input.disabled = shouldBlock ? true : false;
    });
  }

  shake() {
    this._filmDetailsComponent.getElement()
      .style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._filmDetailsComponent.getElement().style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _addFilmCardEvents(film) {
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
  }

  _resetUserRating(film) {
    const checkedInput = this._filmDetailsComponent.getElement()
      .querySelector(`input.film-details__user-rating-input[checked]`);

    if (!checkedInput) {
      return;
    }

    checkedInput.checked = false;
    film.personalRating = 0;
  }

  _onCommentsCountChange(film, updatedFilm) {
    this._onCommentsDataChange(this, film, updatedFilm);
  }

  _addToWatchlist(film) {
    const updatedFilm = MovieModel.clone(film);
    updatedFilm.isWatchlist = !updatedFilm.isWatchlist;

    this._onDataChange(this, film, updatedFilm);
  }

  _addToHistory(film) {
    const updatedFilm = MovieModel.clone(film);
    updatedFilm.isWatched = !updatedFilm.isWatched;
    this._resetUserRating(updatedFilm);

    this._onDataChange(this, film, updatedFilm);
  }

  _addToFavorite(film) {
    const updatedFilm = MovieModel.clone(film);
    updatedFilm.isFavorite = !updatedFilm.isFavorite;

    this._onDataChange(this, film, updatedFilm);
  }

  _openFilmDetails(film) {
    this._onViewChange();

    this._filmDetailsComponent.getElement()
      .style = FILM_DETAIL_OPEN_ANIMATION;

    render(document.body, this._filmDetailsComponent, RenderPosition.BEFOREEND);

    document.addEventListener(`keydown`, this._onEscKeyDown);

    this._mode = Mode.DETAILS;

    this._commentsController.loadComments(film.id);
  }

  _closeFilmDetails() {
    this._filmDetailsComponent.getElement().remove();
    document.removeEventListener(`keydown`, this._onEscKeyDown);

    this._commentsController.resetForm();

    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closeFilmDetails();
    }
  }
}
