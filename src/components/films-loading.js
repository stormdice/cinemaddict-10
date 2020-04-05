import AbstractComponent from './abstract-component';

const createFilmsListLoadingTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmsListLoading extends AbstractComponent {
  getTemplate() {
    return createFilmsListLoadingTemplate();
  }
}
