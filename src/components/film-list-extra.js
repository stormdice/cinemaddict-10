/**
 * создаёт и возвращает разметку для блоков «Top rated movies» и «Most commented»
 * @return {String}
 */
const getFilmListExtraTemplate = () => (
  `<section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container"></div>
  </section>`
);

export {getFilmListExtraTemplate};
