import AbstractComponent from './abstract-component.js';

const createFooterTemplate = (filmsCount) => {
  return (
    `<footer class="footer">
      <section class="footer__logo logo logo--smaller">Cinemaddict</section>
      <section class="footer__statistics">
        <p>${filmsCount} movies inside</p>
      </section>
    </footer>`
  );
};

export default class Footer extends AbstractComponent {
  constructor(filmsCount) {
    super();

    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createFooterTemplate(this._filmsCount);
  }
}
