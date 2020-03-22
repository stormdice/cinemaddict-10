import API from '../api';
import CommentsComponent from '../components/comments';
import {render, replace, RenderPosition} from '../utils/render';

export default class CommentController {
  constructor(container, film) {
    this._container = container;
    this._film = film;

    this._api = new API();
    this._commentsComponent = null;
    this._comments = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._setCommentDelete = this._setCommentDelete.bind(this);
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

  _onDataChange() {
    this.render(this._comments);
  }

  _setCommentDelete(commentId) {
    this._api.deleteComment(commentId)
      .then(() => {
        this._comments = this._comments.filter((it) => it.id !== commentId);
        this._onDataChange();
      })
      .then(() => {
        this._loadComments(this._film.id);
      });
  }

  _loadComments(movieId) {
    this._api.getComments(movieId)
      .then((comments) => {
        this.render(comments);
      });
  }
}
