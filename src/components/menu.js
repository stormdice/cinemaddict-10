import {renderDataFromArrayOfObjects} from '../utils';

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
const getMenuLinkTemplate = ({name, path, active, additional, desription, desriptionItemCount}) => (/* html */
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
const getMenuTemplate = (data) => (/* html */
  `<nav class="main-navigation">
    ${renderDataFromArrayOfObjects(data, getMenuLinkTemplate)}
  </nav>`
);

export {getMenuTemplate};
