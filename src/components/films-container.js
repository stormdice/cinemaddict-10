import AbstractComponent from './abstract-component';

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

