import AbstractSmartComponent from './abstract-smart-component.js';
import CommentComponent from './comment.js';
import {formatRuntime, filmDetailsFormatReleaseDate} from '../utils/common.js';
import {EMOTIONS} from '../const.js';
import he from 'he';

const createGenreMarkup = (genres) => {
  return Array.from(genres)
    .map((filmGenre) => {
      return (
        `<span class="film-details__genre">${filmGenre}</span>`
      );
    })
    .join(`\n`);
};

const createUserRatingMarkup = (film) => {
  const {title, poster} = film;

  return (
    `<div class="form-details__middle-container">
      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <button class="film-details__watched-reset" type="button">Undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="${poster}" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">${title}</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>

            <div class="film-details__user-rating-score">
              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1">
              <label class="film-details__user-rating-label" for="rating-1">1</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2">
              <label class="film-details__user-rating-label" for="rating-2">2</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3">
              <label class="film-details__user-rating-label" for="rating-3">3</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4">
              <label class="film-details__user-rating-label" for="rating-4">4</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5">
              <label class="film-details__user-rating-label" for="rating-5">5</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6">
              <label class="film-details__user-rating-label" for="rating-6">6</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7">
              <label class="film-details__user-rating-label" for="rating-7">7</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8">
              <label class="film-details__user-rating-label" for="rating-8">8</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" checked="">
              <label class="film-details__user-rating-label" for="rating-9">9</label>

            </div>
          </section>
        </div>
      </section>
    </div>`
  );
};

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

const createCommentsMarkup = (comments) => {
  return comments.map((comment) => {
    return new CommentComponent(comment).getTemplate();
  })
  .join(`\n`);
};

const createFilmDetailsTemplate = (film) => {
  const {
    poster,
    ageRating,
    title,
    originalTitle,
    country,
    genre,
    totalRating,
    releaseDate,
    runtime,
    description,
    isWatchlist,
    isWatched,
    isFavorite,
    comments
  } = film;

  const release = filmDetailsFormatReleaseDate(releaseDate);
  const filmRuntime = formatRuntime(runtime);
  const filmGenre = createGenreMarkup(genre);
  const commentsList = createCommentsMarkup(comments);
  const createNewComment = createNewCommentMarkup();

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">Anthony Mann</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">Erich von Stroheim, Mary Beth Hughes, Dan Duryea</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${release}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${filmRuntime}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genre.size <= 1 ? `Genre` : `Genres`}</td>
                  <td class="film-details__cell">${filmGenre}</td>
                </tr>
              </table>

              <p class="film-details__film-description">${description}</p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        ${isWatched ? createUserRatingMarkup(film) : ``}

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
            <ul class="film-details__comments-list">${commentsList}</ul>

            ${createNewComment}
          </section>
        </div>
      </form>
    </section>`
  );
};

const parseFormData = (formData) => {
  return {
    id: String(Math.random()),
    author: `You`,
    text: he.encode(formData.get(`comment`)),
    date: new Date(),
    emotion: formData.get(`comment-emoji`),
  };
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  recoveryListeners() {
    this.setCloseButtonClickHandler(this._closeButtonClickHandler);
    this.setCommentsDeleteClickHandler(this._commentsDeleteClickHandler);
    this.setCommentSubmitHandler(this._commentSubmitHandler);
    this._subscribeOnEvents();
  }

  getAddCommentFormData() {
    const form = this.getElement().querySelector(`.film-details__inner`);
    const formData = new FormData(form);

    return parseFormData(formData);
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);

    this._closeButtonClickHandler = handler;
  }

  setWatchlistInputChangeHandler(handler) {
    this.getElement().querySelector(`#watchlist`).addEventListener(`change`, handler);
  }

  setWatchedInputChangeHandler(handler) {
    this.getElement().querySelector(`#watched`).addEventListener(`change`, handler);
  }

  setFavoriteInputChangeHandler(handler) {
    this.getElement().querySelector(`#favorite`).addEventListener(`change`, handler);
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

    this._commentsDeleteClickHandler = handler;
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

    this._commentSubmitHandler = handler;
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
}
