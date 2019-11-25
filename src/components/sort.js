import {getSortLinkTemplate} from './sort-link';

/**
 * создаёт и возвращает разметку сортировки
 * @param {Object} data - данные из массива ссылок сортировки
 * @return {String}
 */
export const getSortTemplate = (data) => (
  `<ul class="sort">
    ${data.map(getSortLinkTemplate).join(``)}
  </ul>`
);
