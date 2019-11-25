/**
 * создаёт и возвращает разметку скрытой кнопки под изображением карточки
 * @param {String} name - название
 * @param {Boolean} active - активная ли ссылка
 * @return {String}
 */
export const getFilmCardControlTemplate = ({name, active}) => (
  `<button class="film-card__controls-item button ${name} ${active ? `film-card__controls-item--active` : ``}">Add to watchlist</button>`
);
