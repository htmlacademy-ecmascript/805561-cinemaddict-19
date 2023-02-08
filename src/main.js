import FilmsModel from './model/films-model.js';
import FilmsPresenter from './presenter/films-presenter.js';


const filmsModel = new FilmsModel();

const filmsPresenter = new FilmsPresenter(filmsModel);


filmsPresenter.init();
