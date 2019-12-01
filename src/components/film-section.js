import {renderDataFromArrayOfObjects} from '../utils';
import {getFilmCardTemplate} from './film-card';
import {getButtonShowMoreTemplate} from './show-more';
import {getFilmListExtraTemplate} from './film-list-extra';

/**
 * создаёт и возвращает разметку для раздела с фильмами
 * @param {Array} filmCard - данные из массива карточки фильма
 * @param {Array} filmListExtra - данные из массива блоков `Top rated` и `Most commented`
 * @return {String}
 */
export const getFilmsSectionTemplate = (filmCard, filmListExtra) => (/* html */
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
