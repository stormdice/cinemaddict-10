import API from '../api';
import FilmComponent from '../components/film';
import FilmDetailsComponent from '../components/film-details';
import CommentFormComponent from '../components/comment-form';
import MovieModel from '../models/movie';
import CommentModel from '../models/comment';
import CommentsController from './comments-controller';
import {RenderPosition, render, replace} from '../utils/render';
import he from 'he';

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

const parseFormData = (formData) => {
  return new CommentModel({
    'comment': he.encode(formData.get(`comment`)),
    'date': new Date().toISOString(),
    'emotion': formData.get(`comment-emoji`),
  });
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
    this._commentFormComponent = null;
    this._addCommentFormTextField = null;
    this._commentsContainer = null;
    this._commentsController = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmComponent = new FilmComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);
    this._commentFormComponent = new CommentFormComponent();

    this._addCommentFormTextField = this._commentFormComponent.getElement();

    this._commentsContainer = this._filmDetailsComponent.getElement().querySelector(`.film-details__comments-wrap`);
    this._commentsController = new CommentsController(this._commentsContainer, this._api);

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

    this._commentFormComponent.setCommentSubmitHandler(() => {
      const formData = this._filmDetailsComponent.getAddCommentFormData();
      const newComment = parseFormData(formData);
      const isCommentValid = this._validateComment(newComment);

      if (!isCommentValid) {
        this._addCommentFormTextField.classList.add(`invalid`);

        return;
      }

      this._api.createComment(film.id, newComment)
        .then(() => {
          this._loadComments(film.id);
        });
    });

    if (oldFilmComponent && oldFilmDetailsComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container.querySelector(`.films-list__container`), this._filmComponent, RenderPosition.BEFOREEND);
    }

    render(this._commentsContainer, this._commentFormComponent, RenderPosition.BEFOREEND);
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

  _validateComment({emotion, text}) {
    return !!emotion && !!text;
  }

  _addComment(film, newComment) {
    const newFilm = Object.assign({}, film);
    newFilm.comments = [...newFilm.comments, newComment];

    return newFilm;
  }

  _openFilmDetails(film) {
    this._onViewChange();

    this._filmDetailsComponent.getElement().style = `animation: bounceInRight 0.3s;`;

    render(document.body, this._filmDetailsComponent, RenderPosition.BEFOREEND);

    document.addEventListener(`keydown`, this._onEscKeyDown);

    this._mode = Mode.DETAILS;

    this._loadComments(film.id);
  }

  _loadComments(MovieId) {
    this._api.getComments(MovieId)
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
