import {render} from './render.js';

import FilmsModel from './model/films-model.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilterView from './view/filter-view.js';
import ProfileView from './view/profile-view.js';
import SortView from './view/sort-view.js';


const haderElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
//const bodyElement = document.body; //а почему так нельзя?
//const bodyElement = document.querySelector('body');

const filmsPresenter = new FilmsPresenter();
const filmsModel = new FilmsModel();

render(new ProfileView(), haderElement);
render(new FilterView(), mainElement);
if(filmsModel.films.length > 0){
  render(new SortView(), mainElement);
}

filmsPresenter.init(mainElement, filmsModel);
