import AbstractComponent from "./abstract-component";

const getMenuLinkTemplate = (link) => {
  const {name, path, active, additional, desription, desriptionItemCount} = link;

  return (/* html */
    `<a href=${path} class="main-navigation__item ${active ? `main-navigation__item--active` : ``}${additional ? `main-navigation__item--additional` : ``}">${name} ${desription ? `<span class="main-navigation__item-count">${desriptionItemCount}</span>` : ``}</a>`
  );
};

const getMenuTemplate = (links) => {
  const menuLinksTemplate = links.map((link) => getMenuLinkTemplate(link)).join(`\n`);

  return (/* html */
    `<nav class="main-navigation">
      ${menuLinksTemplate}
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  constructor(menuLinks) {
    super();

    this._menuLinks = menuLinks;
  }

  getTemplate() {
    return getMenuTemplate(this._menuLinks);
  }
}
