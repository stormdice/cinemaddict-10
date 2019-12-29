import AbstractComponent from './abstract-component';

/**
 * Создаёт и возвращает разметку для основного списка с фильмами
 * @param {Object} filmList - данные из объекта списков с фильмами
 * @return {String}
 */
const getFilmsContainerTemplate = () => {
  return (/* html */
    `<div class="films-list__container"></div>`
  );
};

export default class FilmsContainer extends AbstractComponent {
  getTemplate() {
    return getFilmsContainerTemplate();
  }
}

