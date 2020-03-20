import CommentsComponent from '../components/comments.js';
import {render, replace, RenderPosition} from '../utils/render.js';

export default class CommentController {
  constructor(container, comments, api) {
    this._container = container;
    this._comments = comments;
    this._api = api;

    this._commentsComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._setCommentDelete = this._setCommentDelete.bind(this);
  }

  render() {
    const container = this._container;
    const oldComponent = this._commentsComponent;

    this._commentsComponent = new CommentsComponent(this._comments);

    this._commentsComponent.setCommentsDeleteClickHandler(this._setCommentDelete);

    if (oldComponent) {
      replace(this._commentsComponent, oldComponent);
    } else {
      render(container, this._commentsComponent, RenderPosition.AFTERBEGIN);
    }
  }

  _onDataChange() {
    this.render();
  }

  _setCommentDelete(id) {
    this._api.deleteComment(id)
      .then(() => {
        this._comments = this._comments.filter((it) => it.id !== id);
        this._onDataChange();
      });
  }
}
