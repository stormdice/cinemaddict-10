/**
 * создаёт и возвращает разметку ссылки сортировки
 * @param {String} name - название
 * @param {Boolean} active - активная ли ссылка
 * @return {String}
 */
export const getSortLinkTemplate = ({name, active}) => (
  `<li><a href="#" class="sort__button ${active ? `sort__button--active` : ``}">${name}</a></li>`
);
