import AbstractSmartComponent from './abstract-smart-component';
import {EMOTIONS} from '../const';

const createEmotionsMarkup = (emotions) => {
  return emotions
    .map((emotion) => {
      return (
        `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
        <label class="film-details__emoji-label" for="emoji-${emotion}">
          <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
        </label>`
      );
    })
    .join(`\n`);
};

const createNewCommentMarkup = () => {
  const emotions = createEmotionsMarkup(EMOTIONS);

  return (
    `<div class="film-details__new-comment">
      <span class="film-details__comment-error-message">Please fill in the comment and choose an emotion.</span>
      <div for="add-emoji" class="film-details__add-emoji-label"></div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">${emotions}</div>
    </div>`
  );
};


export default class CommentForm extends AbstractSmartComponent {
  constructor() {
    super();

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createNewCommentMarkup();
  }

  getAddCommentFormData() {
    const form = this.getElement().closest(`.film-details__inner`);
    return new FormData(form);
  }

  setCommentSubmitHandler(handler) {
    this.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, (evt) => {
        const ctrlOrCommandKey = evt.ctrlKey || evt.metaKey;
        const enterKey = evt.key === `Enter`;

        if (ctrlOrCommandKey && enterKey) {
          handler();
        }
      });
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, function (evt) {
        if (evt.target.tagName !== `INPUT`) {
          return;
        }

        const emotionContainer = element.querySelector(`.film-details__add-emoji-label`);
        const selectedEmotion = evt.target.value;

        emotionContainer.innerHTML = `<img src="./images/emoji/${selectedEmotion}.png" width="55" height="55" alt="emoji">`;
      });
  }

  blockInput(toBlock) {
    const inputs = this.getElement().querySelectorAll(`input, textarea`);

    inputs.forEach((input) => {
      input.disabled = toBlock ? true : false;
    });
  }

  resetForm() {
    this.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
    this.getElement().querySelector(`.film-details__comment-input`).value = ``;
  }
}
