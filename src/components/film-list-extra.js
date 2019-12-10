import {getFilmCardTemplate} from './film-card';

/**
 * создаёт и возвращает разметку для блоков «Top rated movies» и «Most commented»
 * @return {String}
 */
export const getFilmListExtraTemplate = ({name, sort}) => {/* html */
  const renderFilms = () => {
    return sort.map(getFilmCardTemplate).join(``);
  };

  return (`<section class="films-list--extra">
    <h2 class="films-list__title">${name}</h2>
    <div class="films-list__container">
      ${renderFilms()}
    </div>
  </section>`);
};
