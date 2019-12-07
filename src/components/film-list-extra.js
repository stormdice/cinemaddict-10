// import {filmCardsData} from '../data/film-cards';
import {getFilmCardTemplate} from './film-card';

/**
 * создаёт и возвращает разметку для блоков «Top rated movies» и «Most commented»
 * @return {String}
 */
export const getFilmListExtraTemplate = ({name}) => (/* html */
  `<section class="films-list--extra">
    <h2 class="films-list__title">${name}</h2>
    <div class="films-list__container">
      ${filmCardsData.slice(0, 2).map(getFilmCardTemplate).join(``)}
    </div>
  </section>`
);
