import AbstractView from '../framework/view/abstract-view';

const createFilterTemplate = (filterCounts) => {

  const {watchlist, alreadyWatched, favorite} = filterCounts;

  return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${alreadyWatched}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorite}</span></a>
    </nav>`;
};

export default class FilterView extends AbstractView {

  #filterCounts = null;

  constructor(filterCounts) {
    super();
    this.#filterCounts = filterCounts;
  }

  get template (){
    return createFilterTemplate(this.#filterCounts);
  }

}
