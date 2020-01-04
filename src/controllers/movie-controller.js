import FilmDetailsComponent from '../components/film-details';
import FilmCardComponent from '../components/film-card';
import {render, remove, RenderPosition} from '../utils/render';

export default class MovieController {
  constructor(container) {
    this._container = container;
  }

  render(film) {
    const filmComponent = new FilmCardComponent(film);
    const filmDetailsComponent = new FilmDetailsComponent(film);

    const poster = filmComponent.getElement().querySelector(`.film-card__poster`);
    const title = filmComponent.getElement().querySelector(`.film-card__title`);
    const comments = filmComponent.getElement().querySelector(`.film-card__comments`);
    const closePopup = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        remove(filmDetailsComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    closePopup.addEventListener(`click`, () => {
      remove(filmDetailsComponent);
    });

    filmComponent.setOpenDetailsClickHandler((evt) => {
      if ((evt.target === poster) || (evt.target === title) || (evt.target === comments)) {
        render(document.querySelector(`body`), filmDetailsComponent, RenderPosition.BEFOREEND);
        document.addEventListener(`keydown`, onEscKeyDown);
      }
    });

    render(this._container, filmComponent, RenderPosition.BEFOREEND);
  }
}
