import API from '../api';
import CommentsComponent from '../components/comments';
import {render, replace, RenderPosition} from '../utils/render';

export default class CommentController {
  constructor(container) {
    this._container = container;
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

  _setCommentDelete(id) {
    this._api.deleteComment(id)
      .then(() => {
        this._comments = this._comments.filter((it) => it.id !== id);
        this._onDataChange();
      });
  }
}
