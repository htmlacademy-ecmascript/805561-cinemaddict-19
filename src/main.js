import {render} from './render.js';

import FilmsModel from './model/films-model.js';
import FilmsPresenter from './presenter/films-list-presenter.js';
import FilterView from './view/filter-view.js';
import PopupModel from './model/popup-model.js';
import PopupPresenter from './presenter/popup-presenter.js';
import ProfileView from './view/profile-view.js';
import SortView from './view/sort-view.js';


const haderElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const bodyElement = document.body;

const filmsPresenter = new FilmsPresenter();
const filmsModel = new FilmsModel();

const popupPresenter = new PopupPresenter;
const popupModel = new PopupModel();

render(new ProfileView(), haderElement);
render(new FilterView(), mainElement);
render(new SortView(), mainElement);

filmsPresenter.init(mainElement, filmsModel);
popupPresenter.init(bodyElement, popupModel);


