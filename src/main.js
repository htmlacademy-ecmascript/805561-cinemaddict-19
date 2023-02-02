import FilmsModel from './model/films-model.js';
import FilmsPresenter from './presenter/films-presenter.js';

const mainElement = document.querySelector('.main');
const filmsPresenter = new FilmsPresenter();
const filmsModel = new FilmsModel();


filmsPresenter.init(mainElement, filmsModel);
