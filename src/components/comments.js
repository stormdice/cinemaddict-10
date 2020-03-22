import AbstractComponent from './abstract-component';
import {commentFormatDate} from '../utils/common';

const createCommentTemplate = (comment) => {
  const {id, author, text, date, emotion} = comment;
  const commentDate = commentFormatDate(date);

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
          <button type="button" class="film-details__comment-delete" data-id="${id}">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createCommentsMarkup = (comments) => {
  const commentsList = comments.map((comment) => {
    return createCommentTemplate(comment);
  })
  .join(`\n`);

  return (
    `<div>
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
      <ul class="film-details__comments-list">${commentsList}</ul>
    </div>`
  );
};

export default class Comments extends AbstractComponent {
  constructor(comments) {
    super();

    this._comments = comments;
  }

  getTemplate() {
    return createCommentsMarkup(this._comments);
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
  }
}
