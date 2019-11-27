const navigationLinksData = [
  {
    name: `All movies`,
    path: `#all`,
    active: true,
    additional: false,
    desription: false
  },
  {
    name: `Watchlist`,
    path: `#watchlist`,
    active: false,
    additional: false,
    desription: true,
    desriptionItemCount: 13
  },
  {
    name: `History`,
    path: `#history`,
    active: false,
    additional: false,
    desription: true,
    desriptionItemCount: 8
  },
  {
    name: `Favorites`,
    path: `#favorites`,
    active: false,
    additional: false,
    desription: true,
    desriptionItemCount: 4
  },
  {
    name: `Stats`,
    path: `#stats`,
    active: false,
    additional: true,
    desription: false
  }
];

const sortLinksData = [
  {
    name: `Sort by default`,
    active: true
  },
  {
    name: `Sort by date`,
    active: false
  },
  {
    name: `Sort by rating`,
    active: false
  }
];

const filmCardControlsData = [
  {
    name: `add-to-watchlist`,
    desc: `Add to watchlist`
  },
  {
    name: `mark-as-watched`,
    desc: `Mark as watched`
  },
  {
    name: `favorite`,
    desc: `Mark as favorite`
  }
];

const filmCardsData = [
  {
    title: `The Dance of Life`,
    rating: 8.3,
    year: `1929`,
    duration: `1h 55m`,
    genre: `Musical`,
    imgSrc: `./images/posters/the-dance-of-life.jpg`,
    description: `Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…`,
    commentsCount: `5`,
    addToWatchlist: false,
    markAsWatched: false,
    favorite: false
  },
  {
    title: `Sagebrush Trail`,
    rating: 3.2,
    year: `1933`,
    duration: `54m`,
    genre: `Western`,
    imgSrc: `./images/posters/sagebrush-trail.jpg`,
    description: `Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…`,
    commentsCount: `89`,
    addToWatchlist: true,
    markAsWatched: false,
    favorite: false
  },
  {
    title: `The Man with the Golden Arm`,
    rating: 9.0,
    year: `1955`,
    duration: `1h 59m`,
    genre: `Drama`,
    imgSrc: `./images/posters/the-man-with-the-golden-arm.jpg`,
    description: `Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…`,
    commentsCount: `18`,
    addToWatchlist: false,
    markAsWatched: true,
    favorite: false
  },
  {
    title: `Santa Claus Conquers the Martians`,
    rating: 2.3,
    year: `1964`,
    duration: `1h 21m`,
    genre: `Comedy`,
    imgSrc: `./images/posters/santa-claus-conquers-the-martians.jpg`,
    description: `The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…`,
    commentsCount: `465`,
    addToWatchlist: false,
    markAsWatched: false,
    favorite: true
  },
  {
    title: `Popeye the Sailor Meets Sindbad the Sailor`,
    rating: 6.3,
    year: `1936`,
    duration: `16m`,
    genre: `Cartoon`,
    imgSrc: `./images/posters/popeye-meets-sinbad.png`,
    description: `In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…`,
    commentsCount: `0`,
    addToWatchlist: true,
    markAsWatched: true,
    favorite: true
  }
];

const filmListExtraData = [
  {
    name: `Top rated`
  },
  {
    name: `Most commented`
  }
];

const filmDetailsDescriptionData = [
  {
    term: `Director`,
    cell: `Anthony Mann`
  },
  {
    term: `Writers`,
    cell: `Anne Wigton, Heinz Herald, Richard Weil`
  },
  {
    term: `Actors`,
    cell: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`
  },
  {
    term: `Release Date`,
    cell: `30 March 1945`
  },
  {
    term: `Runtime`,
    cell: `1h 18m`
  },
  {
    term: `Country`,
    cell: `USA`
  },
  {
    term: `Genres`,
    cell: `Drama`
  }
];

const filmDetailsControlsData = [
  {
    name: `watchlist`,
    desc: `Add to watchlist`
  },
  {
    name: `watched`,
    desc: `Already watched`
  },
  {
    name: `favorite`,
    desc: `Add to favorites`
  }
];

const FilmDetailsEmojiData = [
  {
    id: `emoji-smile`,
    value: `sleeping`,
    imgSrc: `./images/emoji/smile.png`
  },
  {
    id: `emoji-sleeping`,
    value: `neutral-face`,
    imgSrc: `./images/emoji/sleeping.png`
  },
  {
    id: `emoji-gpuke`,
    value: `grinning`,
    imgSrc: `./images/emoji/puke.png`
  },
  {
    id: `emoji-angry`,
    value: `grinning`,
    imgSrc: `./images/emoji/angry.png`
  }
];

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
 * Возращает разметку из массива объектов
 * @param {Array} array - данные из массива
 * @param {String} template - шаблон разметки
 * @return {String}
 */
const renderDataFromArrayOfObjects = (array, template) => array.map(template).join(``);

/**
 * создаёт и возвращает первые 2 карточки фильма из массива фильмов
 * @return {String}
 */
const renderSlice = () => filmCardsData.slice(0, 2).map(getFilmCardTemplate).join(``);

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
 * создаёт и возвращает разметку ссылки навигации
 * @param {String} name - название
 * @param {String} path - адрес ссылки
 * @param {Boolean} active - активная ли ссылка
 * @param {Boolean} additional - присутствует ли дополнительный класс
 * @param {Boolean} desription - присутствует ли дополнительная разметка для показа количества фильмов
 * @param {Number} desriptionItemCount - количество добавленных фильмов
 * @return {String}
 */
const getNavigationLinkTemplate = ({name, path, active, additional, desription, desriptionItemCount}) => (
  `<a href=${path} class="main-navigation__item ${active ? `main-navigation__item--active` : ``} ${additional ? `main-navigation__item--additional` : ``}">
    ${name}
    ${desription ? `<span class="main-navigation__item-count">${desriptionItemCount}</span>` : ``}
  </a>`
);

/**
 * создаёт и возвращает разметку навигации
 * @param {Object} data - данные из массива ссылок навигации
 * @return {String}
 */
const getNavigationTemplate = (data) => (
  `<nav class="main-navigation">
    ${renderDataFromArrayOfObjects(data, getNavigationLinkTemplate)}
  </nav>`
);

/**
 * создаёт и возвращает разметку ссылки сортировки
 * @param {String} name - название
 * @param {Boolean} active - активная ли ссылка
 * @return {String}
 */
const getSortLinkTemplate = ({name, active}) => (
  `<li><a href="#" class="sort__button ${active ? `sort__button--active` : ``}">${name}</a></li>`
);

/**
 * создаёт и возвращает разметку сортировки
 * @param {Object} data - данные из массива ссылок сортировки
 * @return {String}
 */
const getSortTemplate = (data) => (
  `<ul class="sort">
    ${data.map(getSortLinkTemplate).join(``)}
  </ul>`
);

/**
 * создаёт и возвращает разметку скрытой кнопки под изображением карточки
 * @param {String} name - название
 * @param {Boolean} active - активная ли ссылка
 * @return {String}
 */
const getFilmCardControlTemplate = ({name, desc}) => (
  `<button class="film-card__controls-item button film-card__controls-item--${name}">${desc}</button>`
);

/**
 * создаёт и возвращает разметку карточки фильма
 * @param {String} title - название
 * @param {String} rating - рейтинг
 * @param {String} year - год создания
 * @param {String} genre - жанр
 * @param {String} imgSrc - относительный путь до изображения
 * @param {String} description - описание фильма
 * @param {String} commentsCount - количество коментариев
 * @param {Boolean} addToWatchlist - добавлен ли в лист просмотров
 * @param {Boolean} markAsWatched - отмечен ли как просмотренный
 * @param {Boolean} favorite - добавить ли в избранное
 * @return {String}
 */
const getFilmCardTemplate = ({title, rating, year, duration, genre, imgSrc, description, commentsCount}) => (
  `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src=${imgSrc} alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${commentsCount} comments</a>
    <form class="film-card__controls">
      ${renderDataFromArrayOfObjects(filmCardControlsData, getFilmCardControlTemplate)}
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
const getFilmListExtraTemplate = ({name}) => (
  `<section class="films-list--extra">
    <h2 class="films-list__title">${name}</h2>
    <div class="films-list__container">
      ${renderSlice()}
    </div>
  </section>`
);

/**
 * создаёт и возвращает разметку для раздела с фильмами
 * @param {Array} filmCard - данные из массива карточки фильма
 * @param {Array} filmListExtra - данные из массива блоков `Top rated` и `Most commented`
 * @return {String}
 */
const getFilmsSectionTemplate = (filmCard, filmListExtra) => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
        ${renderDataFromArrayOfObjects(filmCard, getFilmCardTemplate)}
      </div>
      ${getButtonShowMoreTemplate()}
    </section>
    ${renderDataFromArrayOfObjects(filmListExtra, getFilmListExtraTemplate)}
  </section>`
);

/**
 * создаёт и возвращает разметку описания фильма в попапе - расширенном описании
 * @return {String}
 */
const getFilmDetailsDescriptionTemplate = ({term, cell}) => (
  `<tr class="film-details__row">
    <td class="film-details__term">${term}</td>
    <td class="film-details__cell">${cell}</td>
  </tr>`
);

/**
 * создаёт и возвращает разметку кнопок в попапе - расширенном описании
 * @return {String}
 */
const getFilmDetailsControlsTemplate = ({name, desc}) => (
  `<input type="checkbox" class="film-details__control-input visually-hidden" id=${name} name=${name}>
  <label for=${name} class="film-details__control-label film-details__control-label--watchlist">${desc}</label>`
);

/**
 * создаёт и возвращает разметку эмоджи в попапе - расширенном описании
 * @return {String}
 */
const getFilmDetailsEmojiTemplate = ({id, value, imgSrc}) => (
  `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id=${id} value=${value}>
  <label class="film-details__emoji-label" for=${id}>
    <img src=${imgSrc} width="30" height="30" alt="emoji">
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
              ${renderDataFromArrayOfObjects(filmDetailsDescriptionData, getFilmDetailsDescriptionTemplate)}
            </table>

            <p class="film-details__film-description">
              The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarion's other assistant. Flamarion falls in love with Connie, the movie's femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          ${renderDataFromArrayOfObjects(filmDetailsControlsData, getFilmDetailsControlsTemplate)}
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
              ${renderDataFromArrayOfObjects(FilmDetailsEmojiData, getFilmDetailsEmojiTemplate)}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`
);

/**
 * Запускает приложение
 */
const initApp = () => {
  const mainElement = document.querySelector(`.main`);
  const headerElement = document.querySelector(`.header`);
  const footerElement = document.querySelector(`.footer`);

  render(headerElement, getProfileTemplate());
  render(mainElement, getNavigationTemplate(navigationLinksData));
  render(mainElement, getSortTemplate(sortLinksData));
  render(mainElement, getFilmsSectionTemplate(filmCardsData, filmListExtraData));
  render(footerElement, getFilmDetailsTemplate(), `afterend`);
};

initApp();
