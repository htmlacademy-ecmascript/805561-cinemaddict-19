import {render} from './render.js';

import FilmsModel from './model/films-model.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilterView from './view/filter-view.js';
import ProfileView from './view/profile-view.js';
import SortView from './view/sort-view.js';
import FooterStatisticsView from './view/footer-statistics-view';


const haderElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

const filmsPresenter = new FilmsPresenter();
const filmsModel = new FilmsModel();
const filmsCount = filmsModel.films.length;
const favoriteCount = filmsModel.favoriteCount;
const filterCounts = filmsModel.filterCounts;

render(new ProfileView(favoriteCount), haderElement);
render(new FilterView(filterCounts), mainElement);
if(filmsCount > 0){
  render(new SortView(), mainElement);
}
render(new FooterStatisticsView(filmsCount), footerElement);

filmsPresenter.init(mainElement, filmsModel);
