import {renderDataFromArrayOfObjects} from './utils';
import {getFilmCardTemplate} from './film-card';
import {getButtonShowMoreTemplate} from './show-more';

export const getFilmsSectionTemplate = (data) => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
        ${renderDataFromArrayOfObjects(data, getFilmCardTemplate)}
      </div>
      ${getButtonShowMoreTemplate()}
    </section>
  </section>`
);
