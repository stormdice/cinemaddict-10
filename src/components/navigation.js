import {renderDataFromArrayOfObjects} from './utils';
import {getNavigationLinkTemplate} from './navigation-link';

/**
 * создаёт и возвращает разметку навигации
 * @param {Object} data - данные из массива ссылок навигации
 * @return {String}
 */
export const getNavigationTemplate = (data) => (
  `<nav class="main-navigation">
    ${renderDataFromArrayOfObjects(data, getNavigationLinkTemplate)}
  </nav>`
);
