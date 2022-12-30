import {render} from './render.js';

import ProfileView from './view/profile-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';

import FilmsPresenter from './presenter/films-list-presenter.js';
import PopupPresenter from './presenter/popup-presenter.js';

import FilmsModel from './model/films-model.js';
import DetailFilmPopupModel from './model/popup-model.js';


const haderElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const bodyElement = document.body;

const filmsPresenter = new FilmsPresenter();
const filmsModel = new FilmsModel();

const popupPresenter = new PopupPresenter;
const popupModel = new DetailFilmPopupModel();

render(new ProfileView(), haderElement);
render(new FilterView(), mainElement);
render(new SortView(), mainElement);

filmsPresenter.init(mainElement, filmsModel);
popupPresenter.init(bodyElement, popupModel);


