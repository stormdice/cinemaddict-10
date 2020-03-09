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
    this._addCommentFormTextField = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmComponent = new FilmComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);
    this._addCommentFormTextField = this._filmDetailsComponent.getElement().querySelector(`.film-details__new-comment`);

    this._filmComponent.setOpenDetailsClickHandler((evt) => {
      evt.preventDefault();

      this._openFilmDetails();
    });

    this._filmComponent.setWatchlistClickHandler(() => {
      this._onDataChange(this, film, {
        isWatchlist: !film.isWatchlist,
      });
    });

    this._filmComponent.setWatchedClickHandler(() => {
      this._onDataChange(this, film, {
        isWatched: !film.isWatched,
      });
    });

    this._filmComponent.setFavoriteClickHandler(() => {
      this._onDataChange(this, film, {
        isFavorite: !film.isFavorite,
      });
    });

    this._filmDetailsComponent.setCloseButtonClickHandler(() => {
      this._closeFilmDetails();
    });

    this._filmDetailsComponent.setWatchlistInputChangeHandler(() => {
      this._onDataChange(this, film, {
        isWatchlist: !film.isWatchlist,
      });
    });

    this._filmDetailsComponent.setWatchedInputChangeHandler(() => {
      this._onDataChange(this, film, {
        isWatched: !film.isWatched,
      });
    });

    this._filmDetailsComponent.setFavoriteInputChangeHandler(() => {
      this._onDataChange(this, film, {
        isFavorite: !film.isFavorite,
      });
    });

    this._filmDetailsComponent.setCommentsDeleteClickHandler((commentId) => {
      const newFilm = this._deleteComment(film, commentId);

      this._onDataChange(this, film, newFilm);
    });

    this._filmDetailsComponent.setCommentSubmitHandler(() => {
      const newComment = this._filmDetailsComponent.getAddCommentFormData();

      const isCommentValid = this._validateComment(newComment);

      if (!isCommentValid) {
        this._addCommentFormTextField.classList.add(`invalid`);

        return;
      }

      const updatedFilm = this._addComment(film, newComment);

      this._onDataChange(this, film, updatedFilm);
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

  _validateComment({emotion, text}) {
    return !!emotion && !!text;
  }

  _addComment(film, newComment) {
    const newFilm = Object.assign({}, film);
    newFilm.comments = [...newFilm.comments, newComment];

    return newFilm;
  }

  _deleteComment(film, commentId) {
    const newFilm = Object.assign({}, film);

    newFilm.comments = newFilm.comments.filter(({id}) => id !== commentId);

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
