import debounce from 'lodash/debounce';
import {DEBOUNCE_TIMEOUT} from '../const';
import AbstractSmartComponent from './abstract-smart-component';
import {formatRuntime, filmDetailsFormatReleaseDate} from '../utils/common';

const RATING_SCORE = 9;

const createGenreMarkup = (genres) => {
  return Array.from(genres)
    .map((filmGenre) => {
      return (
        `<span class="film-details__genre">${filmGenre}</span>`
      );
    })
    .join(`\n`);
};

const createScoreTemplate = (count, isChecked = false) => {
  return (
    `<input
      type="radio"
      name="score"
      class="film-details__user-rating-input  visually-hidden"
      value="${count}"
      id="rating-${count}"
      ${isChecked ? `checked` : ``}
    >
    <label class="film-details__user-rating-label" for="rating-${count}">${count}</label>`
  );
};

const createRatingInputs = (rating) => {
  let score = 0;

  return new Array(RATING_SCORE)
    .fill(``)
    .map(() => {
      score++;

      const checked = score === rating ? true : false;

      return createScoreTemplate(score, checked);
    })
    .join(`\n`);
};

const createUserRatingMarkup = (title, poster, personalRating) => {
  const scoreTemplate = createRatingInputs(personalRating);

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

            <div class="film-details__user-rating-score">${scoreTemplate}</div>
          </section>
        </div>
      </section>
    </div>`
  );
};

const createFilmDetailsTemplate = (film) => {
  const {
    poster,
    ageRating,
    title,
    originalTitle,
    country,
    genres,
    totalRating,
    director,
    writers,
    actors,
    releaseDate,
    runtime,
    description,
    personalRating,
    isWatchlist,
    isWatched,
    isFavorite,
  } = film;

  const release = filmDetailsFormatReleaseDate(releaseDate);
  const filmRuntime = formatRuntime(runtime);
  const filmGenre = createGenreMarkup(genres);
  const filmWriters = writers.join(`, `);
  const filmActors = actors.join(`, `);

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
                  ${(isWatched && personalRating !== 0) ? `<p class="film-details__user-rating">Your rate ${personalRating}</p>` : ``}
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${filmWriters}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${filmActors}</td>
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
                  <td class="film-details__term">${genres.length <= 1 ? `Genre` : `Genres`}</td>
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

        ${isWatched ? createUserRatingMarkup(title, poster, personalRating) : ``}

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap"></section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }

  setWatchlistInputChangeHandler(handler) {
    this.getElement().querySelector(`#watchlist`)
      .addEventListener(`change`, debounce(handler, DEBOUNCE_TIMEOUT));
  }

  setWatchedInputChangeHandler(handler) {
    this.getElement().querySelector(`#watched`)
      .addEventListener(`change`, debounce(handler, DEBOUNCE_TIMEOUT));
  }

  setFavoriteInputChangeHandler(handler) {
    this.getElement().querySelector(`#favorite`)
      .addEventListener(`change`, debounce(handler, DEBOUNCE_TIMEOUT));
  }

  setUserRatingInputChangeHandler(handler) {
    const userRatingScoreElement = this.getElement()
      .querySelector(`.film-details__user-rating-score`);

    if (!userRatingScoreElement) {
      return;
    }

    this.getElement().querySelector(`.film-details__user-rating-score`)
      .addEventListener(`change`, (evt) => {
        if (evt.target.tagName !== `INPUT`) {
          return;
        }

        const score = evt.target.value;
        handler(score);
      });
  }

  setUndoButtonClickHandler(handler) {
    const undoButtonElement = this.getElement().querySelector(`.film-details__watched-reset`);

    if (!undoButtonElement) {
      return;
    }

    undoButtonElement.addEventListener(`click`, handler);
  }
}
