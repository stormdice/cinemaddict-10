/**
 * создаёт и возвращает разметку ссылки сортировки
 * @param {String} name - название
 * @param {Boolean} active - активная ли ссылка
 * @return {String}
 */
const getSortLinkTemplate = ({name, active}) => (/* html */
  `<li><a href="#" class="sort__button ${active ? `sort__button--active` : ``}">${name}</a></li>`
);

/**
 * создаёт и возвращает разметку сортировки
 * @param {Object} data - данные из массива ссылок сортировки
 * @return {String}
 */
const getSortTemplate = (data) => (/* html */
  `<ul class="sort">
    ${data.map(getSortLinkTemplate).join(``)}
  </ul>`
);

export {getSortTemplate};
