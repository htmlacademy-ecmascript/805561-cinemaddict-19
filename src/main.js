import {render, RenderPosition} from './render.js';

import ProfileView from './view/profile-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import PopupView from './view/popup-view.js';
import FilmListPresenter from './presenter/films-list-presenter.js';


const haderElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const bodyElement = document.querySelector('body');
const filmsListContainerElement = document.querySelector('.films-list__container');
const FilmsPresenter = new FilmListPresenter();

render(new ProfileView(), haderElement);
render(new SortView(), mainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), mainElement, RenderPosition.AFTERBEGIN);
render(new PopupView(), bodyElement);

FilmsPresenter.init(filmsListContainerElement);
