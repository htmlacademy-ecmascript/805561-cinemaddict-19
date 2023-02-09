import AbstractView from '../framework/view/abstract-view';
import {FilterType} from '../const';

const createFilterTemplate = (filterCounts, currentFilter) => {

  const {watchlist, alreadyWatched, favorite} = filterCounts;
  console.log(currentFilter);
  return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item ${FilterType.ALL === currentFilter ? 'main-navigation__item--active' : ''}" data-filter-type=${FilterType.ALL}>All movies</a>
    <a href="#watchlist" class="main-navigation__item ${FilterType.WATCHLIST === currentFilter ? 'main-navigation__item--active' : ''}" data-filter-type=${FilterType.WATCHLIST} >Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
    <a href="#history" class="main-navigation__item ${FilterType.HISTORY === currentFilter ? 'main-navigation__item--active' : ''}" data-filter-type=${FilterType.HISTORY}>History <span class="main-navigation__item-count">${alreadyWatched}</span></a>
    <a href="#favorites" class="main-navigation__item ${FilterType.FAVORITES === currentFilter ? 'main-navigation__item--active' : ''}" data-filter-type=${FilterType.FAVORITES}>Favorites <span class="main-navigation__item-count">${favorite}</span></a>
    </nav>`;
};

export default class FilterView extends AbstractView {

  #filterCounts = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filterCounts, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filterCounts = filterCounts;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  get template (){
    return createFilterTemplate(this.#filterCounts, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.dataset.filterType);

    console.log(evt.target.dataset.filterType);
  };

}
