import AbstractComponent from "./abstract-component";

const getButtonShowMoreTemplate = () => (/* html */
  `<button class="films-list__show-more">Show more</button>`
);

export default class ShowMoreButton extends AbstractComponent {
  getTemplate() {
    return getButtonShowMoreTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
