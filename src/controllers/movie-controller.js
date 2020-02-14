import FilmComponent from '../components/film.js';
import FilmDetailsComponent from '../components/film-details.js';
import {RenderPosition, render} from '../utils/render.js';

export default class MovieController {
  /**
   * Создаёт контейнер
   * @param {HTMLElement} container - контейнер для вставки
   */
  constructor(container) {
    this.container = container;
  }

  /**
   * Отрисовывает фильм
   * @param {Object} film - данные из объекта фильмов
   */
  render(film) {
    const filmComponent = new FilmComponent(film);
    const filmDetailsComponent = new FilmDetailsComponent(film);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        filmDetailsComponent.getElement().remove();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmDetailsComponent.setCloseButtonClickHandler(() => {
      filmDetailsComponent.getElement().remove();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    filmComponent.setOpenDetailsClickHandler((evt) => {
      evt.preventDefault();
      render(document.body, filmDetailsComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    render(this.container.querySelector(`.films-list__container`), filmComponent, RenderPosition.BEFOREEND);
  }
}
