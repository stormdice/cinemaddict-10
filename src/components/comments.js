import AbstractSmartComponent from './abstract-smart-component';
import {commentFormatDate} from '../utils/common';

const DEFAULT_DELETE_BUTTON_TEXT = `Delete`;

const createCommentTemplate = (comment, isPressed, modifiedDeleteButtonText) => {
  const {id, author, text, date, emotion} = comment;
  const commentDate = commentFormatDate(date);
  const deleteButtonText = isPressed ? modifiedDeleteButtonText : DEFAULT_DELETE_BUTTON_TEXT;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentDate}</span>
          <button type="button" class="film-details__comment-delete" data-id="${id}">${deleteButtonText}</button>
        </p>
      </div>
    </li>`
  );
};

const createCommentsMarkup = (comments, options = {}) => {
  const {modifiedDeleteButtonText, selectedId} = options;
  const commentsList = comments.map((comment) => {
    const isPressed = selectedId === comment.id ? true : false;

    return createCommentTemplate(comment, isPressed, modifiedDeleteButtonText);
  })
  .join(`\n`);

  return (
    `<div>
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
      <ul class="film-details__comments-list">${commentsList}</ul>
    </div>`
  );
};

export default class Comments extends AbstractSmartComponent {
  constructor(comments) {
    super();

    this._comments = comments;
    this._modifiedDeleteButtonText = DEFAULT_DELETE_BUTTON_TEXT;
    this._selectedId = null;
  }

  getTemplate() {
    return createCommentsMarkup(this._comments, {
      modifiedDeleteButtonText: this._modifiedDeleteButtonText,
      selectedId: this._selectedId
    });
  }

  recoveryListeners() {
    this.setCommentsDeleteClickHandler(this._setCommentsDelete);
  }

  setCommentsDeleteClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (!evt.target.classList.contains(`film-details__comment-delete`)) {
        return;
      }

      const commentId = evt.target.dataset.id;

      handler(commentId);
    });

    this._setCommentsDelete = handler;
  }

  getDeleteButton(commentId) {
    return this.getElement().querySelector(`button[data-id="${commentId}"]`);
  }

  setDeleteButtonText(commentId, text) {
    this._modifiedDeleteButtonText = text;
    this._selectedId = commentId;
    this.rerender();
  }
}

export {DEFAULT_DELETE_BUTTON_TEXT};
