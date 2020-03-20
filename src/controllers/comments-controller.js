import CommentsComponent from '../components/comments.js';
import {render, replace, RenderPosition} from '../utils/render.js';

export default class CommentController {
  constructor(container, comments) {
    this._container = container;
    this._comments = comments;

    this._commentComponent = null;
  }

  render() {
    const container = this._container;
    const oldComponent = this._commentComponent;

    this._commentComponent = new CommentsComponent(this._comments);

    if (oldComponent) {
      replace(this._commentComponent, oldComponent);
    } else {
      render(container, this._commentComponent, RenderPosition.AFTERBEGIN);
    }
  }

  _setCommentDelete(handler) {
    this._commentComponent.setCommentsDeleteClickHandler(handler);
  }
}
