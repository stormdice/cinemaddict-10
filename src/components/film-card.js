import {renderDataFromArrayOfObjects} from '../utils';
import {filmCardControlsData} from '../data/film-cards';

/**
 * создаёт и возвращает разметку скрытой кнопки под изображением карточки
 * @param {String} name - название
 * @param {Boolean} active - активная ли ссылка
 * @return {String}
 */
const getFilmCardControlTemplate = ({name, desc}) => (/* html */
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
const getFilmCardTemplate = ({title, rating, year, duration, genre, imgSrc, description, commentsCount}) => (/* html */
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

export {getFilmCardTemplate};
