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
export const getNavigationLinkTemplate = ({name, path, active, additional, desription, desriptionItemCount}) => (
  `<a href=${path} class="main-navigation__item ${active ? `main-navigation__item--active` : ``} ${additional ? `main-navigation__item--additional` : ``}">
    ${name}
    ${desription ? `<span class="main-navigation__item-count">${desriptionItemCount}</span>` : ``}
  </a>`
);
