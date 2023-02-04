import AbstractView from '../framework/view/abstract-view';
import {SortType} from '../const';

const createSortTemplate = () => (
  `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE_DOWN}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING_DOWN}">Sort by rating</a></li>
    </ul>`
);

export default class SortView extends AbstractView{

  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };

}
