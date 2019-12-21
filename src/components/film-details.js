import {createElement} from '../utils';
import {DESCRIPTION_TEXT_LIMIT, EMOJIS} from '../const';

/**
 * создаёт и возвращает разметку кнопок в попапе - расширенном описании
 * @param {Object} controls - данные из объекта кнопок управления
 * @return {String}
 */
const getControlsTemplate = (controls) => {
  const {name, desc} = controls;

  return (/* html */
    `<input type="checkbox" class="film-details__control-input visually-hidden" id=${name} name=${name}>
    <label for=${name} class="film-details__control-label film-details__control-label--watchlist">${desc}</label>`
  );
};

/**
 * создаёт и возвращает разметку эмоджи в попапе - расширенном описании
 * @param {Object} emoji - данные из объекта эмоджи
 * @return {String}
 */
const getEmojiTemplate = (emoji) => {
  const {id, value, imgSrc} = emoji;
  return (/* html */
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id=${id} value=${value}>
    <label class="film-details__emoji-label" for=${id}>
      <img src=${imgSrc} width="30" height="30" alt="emoji">
    </label>`
  );
};

/**
 * создаёт и возвращает разметку попапа - расширенного описания
 * @param {Object} film - данные из объекта детального описания фильма
 * @return {String}
 */
const getFilmDetailsTemplate = (film) => {
  const {
    filmInfo: {
      title,
      originalTitle,
      totalRating,
      poster,
      ageRating,
      director,
      writers,
      actors
    },
    release: {
      date,
      country
    },
    runtime,
    genres,
    description,
    controls
  } = film;

  /**
   * Сокращает длину строки
   * @param {String} filmDescription
   * @return {String}
   */
  const limitDescription = (filmDescription) => {
    return (filmDescription.length > DESCRIPTION_TEXT_LIMIT) ? `${filmDescription.slice(0, DESCRIPTION_TEXT_LIMIT)}…` : filmDescription;
  };

  const releaseDate = `1 december ${date}`;
  const DetailedDescription = description.join(` `);
  const filmGenres = genres.slice(0, 3).map((genre) =>`<span class="film-details__genre">${genre}</span>`).join(` `);
  const filmDescription = limitDescription(DetailedDescription);
  const controlsButton = controls.map((control) => getControlsTemplate(control)).join(`\n`);
  const emojis = EMOJIS.map((emoji) => getEmojiTemplate(emoji)).join(`\n`);

  return (/* html */
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src=${poster} alt="">

              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">${originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${runtime}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">${filmGenres}</td>
                </tr>
              </table>

              <p class="film-details__film-description">${filmDescription}</p>
            </div>
          </div>

          <section class="film-details__controls">${controlsButton}</section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">0</span></h3>

            <ul class="film-details__comments-list"></ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                <img src="images/emoji/smile.png" width="55" height="55" alt="emoji">
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">Great movie!</textarea>
              </label>

              <div class="film-details__emoji-list">${emojis}</div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails {
  constructor(filmDetails) {
    this._filmDetails = filmDetails;
    this._element = null;
  }

  getTemplate() {
    return getFilmDetailsTemplate(this._filmDetails);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this.element = null;
  }
}
