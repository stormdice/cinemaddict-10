import {renderDataFromArrayOfObjects} from '../utils';

/**
 * создаёт и возвращает разметку скрытой кнопки под изображением карточки
 * @param {String} name - имя класса
 * @param {Boolean} active - активная ли ссылка
 * @param {Boolean} desc - имя кнопки
 * @return {String}
 */
const getFilmCardControlTemplate = ({name, active, desc}) => (/* html */
  `<button class="film-card__controls-item button ${active ? `film-card__controls-item--active` : ``} film-card__controls-item--${name}">${desc}</button>`
);

/**
 * создаёт и возвращает разметку карточки фильма из массива объектов.
 * Деструктурируем объект и получаем следующие ключи:
 * @property {String} title - название
 * @property {String} rating - рейтинг
 * @property {String} year - год создания
 * @property {String} genre - жанр
 * @property {String} imgSrc - относительный путь до изображения
 * @property {String} description - описание фильма
 * @property {String} commentsCount - количество коментариев
 * @property {String} controls - кнопки для добавления в избранное, лист просмотренных фильмов и т. д.
 * @property {Boolean} addToWatchlist - добавлен ли в лист просмотров
 * @property {Boolean} markAsWatched - отмечен ли как просмотренный
 * @property {Boolean} favorite - добавить ли в избранное
 * @return {String}
 */
const getFilmCardTemplate = ({title, rating, year, duration, genre, imgSrc, description, commentsCount, controls}) => (/* html */
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
      ${renderDataFromArrayOfObjects(controls, getFilmCardControlTemplate)}
    </form>
  </article>`
);

export {getFilmCardTemplate};
