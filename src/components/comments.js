import AbstractComponent from './abstract-component.js';
import {commentFormatDate} from '../utils/common.js';

const createCommentTemplate = (comment) => {
  const {id, author, text, date, emotion} = comment;
  const commentDate = commentFormatDate(date);

  return (
    `<li class="film-details__comment" id="${id}">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentDate}</span>
          <button class="film-details__comment-delete">Delete</button>
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
    this.getElement().querySelectorAll(`.film-details__comment-delete`)
      .forEach((deleteButton) => {
        deleteButton.addEventListener(`click`, (evt) => {
          evt.preventDefault();
          const commentId = evt.target.closest(`li`).id;
          handler(commentId);
        });
      });
  }
}
