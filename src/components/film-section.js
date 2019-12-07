// import {renderDataFromArrayOfObjects} from '../utils';
import {getFilmCardTemplate} from './film-card';
import {getButtonShowMoreTemplate} from './show-more';
// import {getFilmListExtraTemplate} from './film-list-extra';
import {generateFilms} from '../data/film-card';

const FILM_COUNT = 15;
const films = generateFilms(FILM_COUNT);

/**
 * Возвращает разметку с нужным количеством карточек
 * @return {String}
 */
const renderFilms = () => {
  return films.map(getFilmCardTemplate).join(``);
};

/**
 * создаёт и возвращает разметку для раздела с фильмами
 * @param {Array} filmListExtra - данные из массива блоков `Top rated` и `Most commented`
 * @return {String}
 */
export const getFilmsSectionTemplate = (filmListExtra) => (/* html */
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
        ${renderFilms()}
      </div>
      ${getButtonShowMoreTemplate()}
    </section>

  </section>`
);

// ${renderDataFromArrayOfObjects(filmCard, getFilmCardTemplate)}
// ${renderDataFromArrayOfObjects(filmListExtra, getFilmListExtraTemplate)}
