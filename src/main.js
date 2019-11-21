'use strict';

const FILM_COUNT = 5;
const NAVIGATION_LINK_COUNT = 5;
const SORT_LINK_COUNT = 3;
const EXTRA_FILM_LIST = 2;
const EXTRA_FILM_LIST_FILM_COUNT = 2;
const FILM_DETAILS_DESCRIPTION_COUNT = 7;
const FILM_DETAILS_CONTROL_COUNT = 3;
const FILM_DETAILS_EMOJI_COUNT = 4;

/**
 * Объединяет и возращает необходимое количество шаблонов разметки
 * @param {Number} count - количество элементов
 * @param {String} template - шаблон разметки
 * @return {String}
 */
const renderInLoop = (count, template) => new Array(count).fill(``).map(template).join(``);

/**
 * создаёт и возвращает разметку профиля
 * @return {String}
 */
const getProfileTemplate = () => (
  `<section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

/**
 * создаёт и возвращает разметку ссылки в навигации
 * @return {String}
 */
const getNavigationItemTemplate = () => (
  `<a href="#all" class="main-navigation__item">All movies</a>`
);

/**
 * создаёт и возвращает разметку навигации
 * @return {String}
 */
const getNavigationTemplate = () => (
  `<nav class="main-navigation">
    ${renderInLoop(NAVIGATION_LINK_COUNT, getNavigationItemTemplate)}
  </nav>`
);

/**
 * создаёт и возвращает разметку элемента сортировки
 * @return {String}
 */
const getSortItemTemplate = () => (
  `<li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>`
);

/**
 * создаёт и возвращает разметку сортировки
 * @return {String}
 */
const getSortTemplate = () => (
  `<ul class="sort">
    ${renderInLoop(SORT_LINK_COUNT, getSortItemTemplate)}
  </ul>`
);

/**
 * создаёт и возвращает разметку карточки фильма
 * @return {String}
 */
const getItemTemplate = () => (
  `<article class="film-card">
    <h3 class="film-card__title">The Man with the Golden Arm</h3>
    <p class="film-card__rating">9.0</p>
    <p class="film-card__info">
      <span class="film-card__year">1955</span>
      <span class="film-card__duration">1h 59m</span>
      <span class="film-card__genre">Drama</span>
    </p>
    <img src="./images/posters/the-man-with-the-golden-arm.jpg" alt="" class="film-card__poster">
    <p class="film-card__description">Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…</p>
    <a class="film-card__comments">18 comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  film-card__controls-item--active">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`
);

/**
 * создаёт и возвращает разметку кнопки 'Показать больше'
 * @return {String}
 */
const getButtonShowMoreTemplate = () => (
  `<button class="films-list__show-more">Show more</button>`
);

/**
 * создаёт и возвращает разметку для блоков «Top rated movies» и «Most commented»
 * @return {String}
 */
const getFilmListExtraTemplate = () => (
  `<section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container">
      ${renderInLoop(EXTRA_FILM_LIST_FILM_COUNT, getItemTemplate)}
    </div>
  </section>`
);

/**
 * создаёт и возвращает разметку блока Фильмов
 * @return {String}
 */
const getFilmsSectionTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
        ${renderInLoop(FILM_COUNT, getItemTemplate)}
      </div>
      ${getButtonShowMoreTemplate()}
    </section>
    ${renderInLoop(EXTRA_FILM_LIST, getFilmListExtraTemplate)}
  </section>`
);

/**
 * создаёт и возвращает разметку описания фильма в попапе - расширенном описании
 * @return {String}
 */
const getFilmDetailsDescriptionTemplate = () => (
  `<tr class="film-details__row">
    <td class="film-details__term">Director</td>
    <td class="film-details__cell">Anthony Mann</td>
  </tr>`
);

/**
 * создаёт и возвращает разметку кнопок в попапе - расширенном описании
 * @return {String}
 */
const getFilmDetailsControlsTemplate = () => (
  `<input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
  <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>`
);

/**
 * создаёт и возвращает разметку эмоджи в попапе - расширенном описании
 * @return {String}
 */
const getFilmDetailsEmojiTemplate = () => (
  `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping" checked>
  <label class="film-details__emoji-label" for="emoji-smile">
    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
  </label>`
);

/**
 * создаёт и возвращает разметку попапа - расширенного описания
 * @return {String}
 */
const getFilmDetailsTemplate = () => (
  `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/the-great-flamarion.jpg" alt="">

            <p class="film-details__age">18+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">The Great Flamarion</h3>
                <p class="film-details__title-original">Original: The Great Flamarion</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">8.9</p>
              </div>
            </div>

            <table class="film-details__table">
              ${renderInLoop(FILM_DETAILS_DESCRIPTION_COUNT, getFilmDetailsDescriptionTemplate)}
            </table>

            <p class="film-details__film-description">
              The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarion's other assistant. Flamarion falls in love with Connie, the movie's femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          ${renderInLoop(FILM_DETAILS_CONTROL_COUNT, getFilmDetailsControlsTemplate)}
        </section>
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

            <div class="film-details__emoji-list">
              ${renderInLoop(FILM_DETAILS_EMOJI_COUNT, getFilmDetailsEmojiTemplate)}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`
);

/**
 * Вставляет разметку
 * @param {DOMNode} container - элемент, относительно которого будет вставка
 * @param {String} template - шаблон разметки
 * @param {DOMString} place - определяет позицию добавляемого элемента относительно элемента, вызвавшего метод
 */
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

/**
 * Запускает приложение
 */
const initApp = () => {
  const mainElement = document.querySelector(`.main`);
  const headerElement = document.querySelector(`.header`);
  const footerElement = document.querySelector(`.footer`);

  render(headerElement, getProfileTemplate());
  render(mainElement, getNavigationTemplate());
  render(mainElement, getSortTemplate());
  render(mainElement, getFilmsSectionTemplate());
  render(footerElement, getFilmDetailsTemplate(), `afterend`);
};

initApp();
