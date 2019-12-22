import AbstractComponent from "./abstract-component";

/**
 * создаёт и возвращает разметку ссылки сортировки.
 * @param {Object} link - данные из объекта ссылки сортировки
 * @return {String}
 */
const getSortLinkTemplate = (link) => {
  const {name, active} = link;

  return (/* html */
    `<li><a href="#" class="sort__button ${active ? `sort__button--active` : ``}">${name}</a></li>`
  );
};

/**
 * создаёт и возвращает разметку сортировки
 * @param {Object} links - данные из массива ссылок сортировки
 * @return {String}
 */
const getSortTemplate = (links) => {
  const sortLinksTemplate = links.map((link) => getSortLinkTemplate(link)).join(`\n`);

  return (/* html */
    `<ul class="sort">
      ${sortLinksTemplate}
    </ul>`
  );
};

export default class Sort extends AbstractComponent {
  constructor(sortLinks) {
    super();

    this._sortLinks = sortLinks;
  }

  getTemplate() {
    return getSortTemplate(this._sortLinks);
  }
}
