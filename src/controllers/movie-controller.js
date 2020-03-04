import FilmComponent from '../components/film.js';
import FilmDetailsComponent from '../components/film-details.js';
import {RenderPosition, render, replace} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmComponent = new FilmComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._filmComponent.setOpenDetailsClickHandler((evt) => {
      evt.preventDefault();

      this._openFilmDetails();
    });

    this._filmComponent.setWatchlistClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist,
      }));
    });

    this._filmComponent.setWatchedClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });

    this._filmComponent.setFavoriteClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    this._filmDetailsComponent.setCloseButtonClickHandler(() => {
      this._closeFilmDetails();
    });

    this._filmDetailsComponent.setWatchlistInputChangeHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist,
      }));
    });

    this._filmDetailsComponent.setWatchedInputChangeHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });

    this._filmDetailsComponent.setFavoriteInputChangeHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    this._filmDetailsComponent.setCommentsDeleteClickHandler((commentId) => {
      const newFilm = this._deleteComment(film, commentId);

      this._onDataChange(this, film, newFilm);
    });

    this._filmDetailsComponent.setCommentSubmitHandler(() => {
      const newFilm = this._addComment(film);

      this._onDataChange(this, film, newFilm);
    });

    if (oldFilmComponent && oldFilmDetailsComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container.querySelector(`.films-list__container`), this._filmComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeFilmDetails();
    }
  }

  updateFilmDetails() {
    this._filmDetailsComponent.rerender();
  }

  _addComment(film) {
    const newFilm = Object.assign({}, film);
    const newComment = this._filmDetailsComponent.getData();

    newFilm.comments = [].concat(newComment, newFilm.comments);

    return newFilm;
  }

  _deleteComment(film, commentId) {
    const newFilm = Object.assign({}, film);
    const commentIndex = newFilm.comments.findIndex((it) => it.id === commentId);

    if (commentIndex === -1) {
      return false;
    }

    newFilm.comments = [].concat(newFilm.comments.slice(0, commentIndex), newFilm.comments.slice(commentIndex + 1));

    return newFilm;
  }

  _openFilmDetails() {
    this._onViewChange();

    this._filmDetailsComponent.getElement().style = `animation: bounceInRight 0.3s;`;
    render(document.body, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DETAILS;
  }

  _closeFilmDetails() {
    this._filmDetailsComponent.getElement().remove();

    document.removeEventListener(`keydown`, this._onEscKeyDown);

    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._filmDetailsComponent.getElement().remove();

      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
