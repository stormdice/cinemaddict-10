import {renderDataFromArrayOfObjects} from '../utils';
import {getButtonShowMoreTemplate} from './show-more';
import {getFilmListExtraTemplate} from './film-list-extra';

/**
 * создаёт и возвращает разметку для раздела с фильмами
 * @param {Array} filmListExtra - данные из массива блоков `Top rated` и `Most commented`
 * @return {String}
 */
export const getFilmsSectionTemplate = (filmListExtra) => (/* html */
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container"></div>
      ${getButtonShowMoreTemplate()}
    </section>
    ${renderDataFromArrayOfObjects(filmListExtra, getFilmListExtraTemplate)}
  </section>`
);
