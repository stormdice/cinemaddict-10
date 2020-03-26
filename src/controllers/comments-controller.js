import API from '../api';
import CommentsComponent from '../components/comments';
import CommentFormComponent from '../components/comment-form';
import CommentModel from '../models/comment';
import {render, replace, RenderPosition} from '../utils/render';
import he from 'he';

const parseFormData = (formData) => {
  return new CommentModel({
    'comment': he.encode(formData.get(`comment`)),
    'date': new Date().toISOString(),
    'emotion': formData.get(`comment-emoji`),
  });
};

export default class CommentController {
  constructor(container, film) {
    this._container = container;
    this._film = film;

    this._api = new API();
    this._shake = null;
    this._updateFilmCardHandler = null;
    this._commentsComponent = null;
    this._comments = null;
    this._commentFormComponent = null;
    this._addCommentFormTextField = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._setCommentDelete = this._setCommentDelete.bind(this);
  }

  set shake(handler) {
    this._shake = handler;
  }

  onCommentsCountChangeHandler(handler) {
    this._updateFilmCardHandler = handler;
  }

  render(comments) {
    const container = this._container;
    const oldComponent = this._commentsComponent;

    this._comments = comments;
    this._commentsComponent = new CommentsComponent(this._comments);

    this._commentsComponent.setCommentsDeleteClickHandler(this._setCommentDelete);

    if (oldComponent) {
      replace(this._commentsComponent, oldComponent);
    } else {
      render(container, this._commentsComponent, RenderPosition.AFTERBEGIN);
    }
  }

  renderCommentsForm() {
    const container = this._container;
    const oldComponent = this._commentFormComponent;

    this._commentFormComponent = new CommentFormComponent();
    this._addCommentFormTextField = this._commentFormComponent.getElement();

    this._commentFormComponent.setCommentSubmitHandler(() => {
      const formData = this._commentFormComponent.getAddCommentFormData();
      const newComment = parseFormData(formData);
      const isCommentValid = this._validateComment(newComment);

      if (!isCommentValid) {
        this._addCommentFormTextField.classList.add(`invalid`);

        return;
      }

      this._addCommentFormTextField.classList.remove(`invalid`);

      this._commentFormComponent.blockInput(true);

      this._api.createComment(this._film.id, newComment)
        .then(() => {
          this._commentFormComponent.resetForm();
          this._commentFormComponent.blockInput(false);

          if (this._updateFilmCardHandler !== null) {
            this._updateFilmCardHandler(this._film);
          }
        })
        .catch(() => {
          if (this._shake !== null) {
            this._shake();
            this._commentFormComponent.blockInput(false);
          }
        });
    });

    if (oldComponent) {
      replace(this._commentFormComponent, oldComponent);
    } else {
      render(container, this._commentFormComponent, RenderPosition.BEFOREEND);
    }
  }

  _onDataChange() {
    this.render(this._comments);
  }

  _setCommentDelete(commentId) {
    this._api.deleteComment(commentId)
      .then(() => {
        this._comments = this._comments.filter((it) => it.id !== commentId);
        this._onDataChange();

        if (this._updateFilmCardHandler !== null) {
          this._updateFilmCardHandler(this._film);
        }
      })
      .then(() => {
        this.loadComments(this._film.id);
      });
  }

  loadComments(movieId) {
    this._api.getComments(movieId)
      .then((comments) => {
        this.render(comments);
      });
  }

  _validateComment({emotion, text}) {
    return !!emotion && !!text;
  }
}
